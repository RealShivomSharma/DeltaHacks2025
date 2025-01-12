import React, { useState, useRef, useCallback, useImperativeHandle, useEffect } from 'react';
import sleep from 'p-sleep';
import "./SwipeComponent.css"

const settings = {
  snapBackDuration: 300,
  maxTilt: 5,
  bouncePower: 0.2,
  swipeThreshold: 300, // px/s
};

const getElementSize = (element) => {
  const elementStyles = window.getComputedStyle(element);
  const width = parseInt(elementStyles.getPropertyValue('width'), 10);
  const height = parseInt(elementStyles.getPropertyValue('height'), 10);
  return { x: width, y: height };
};

const pythagoras = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

const animateOut = async (element, speed, easeIn = false) => {
  const startPos = getTranslate(element);
  const bodySize = getElementSize(document.body);
  const diagonal = pythagoras(bodySize.x, bodySize.y);

  const velocity = pythagoras(speed.x, speed.y);
  const time = diagonal / velocity;
  const multiplier = diagonal / velocity;

  const translateString = translationString(speed.x * multiplier + startPos.x, -speed.y * multiplier + startPos.y);
  let rotateString = '';

  const rotationPower = 200;
  if (easeIn) {
    element.style.transition = `ease ${time}s`;
  } else {
    element.style.transition = `ease-out ${time}s`;
  }

  if (getRotation(element) === 0) {
    rotateString = rotationString((Math.random() - 0.5) * rotationPower);
  } else if (getRotation(element) > 0) {
    rotateString = rotationString((Math.random()) * rotationPower / 2 + getRotation(element));
  } else {
    rotateString = rotationString((Math.random() - 1) * rotationPower / 2 + getRotation(element));
  }

  element.style.transform = translateString + rotateString;
  await sleep(time * 1000);
};

const animateBack = (element) => {
  element.style.transition = `${settings.snapBackDuration}ms`;
  const startingPoint = getTranslate(element);
  const translation = translationString(startingPoint.x * -settings.bouncePower, startingPoint.y * -settings.bouncePower);
  const rotation = rotationString(getRotation(element) * -settings.bouncePower);
  element.style.transform = translation + rotation;

  setTimeout(() => {
    element.style.transform = 'none';
  }, settings.snapBackDuration * 0.75);

  setTimeout(() => {
    element.style.transition = '10ms';
  }, settings.snapBackDuration);
};

const getSwipeDirection = (speed) => {
  if (Math.abs(speed.x) > Math.abs(speed.y)) {
    return speed.x > 0 ? 'right' : 'left';
  } else {
    // Only allow up swipe
    if (speed.y > 0) {
      return 'up'; // Only allow up swipe
    }
    return null; // Block down swipe and any unwanted directions
  }
};

const calcSpeed = (oldLocation, newLocation) => {
  const dx = newLocation.x - oldLocation.x;
  const dy = oldLocation.y - newLocation.y;
  const dt = (newLocation.time - oldLocation.time) / 1000;
  return { x: dx / dt, y: dy / dt };
};

const translationString = (x, y) => `translate(${x}px, ${y}px)`;

const rotationString = (rot) => `rotate(${rot}deg)`;

const getTranslate = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return { x: matrix.m41, y: matrix.m42 };
};

const getRotation = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  return -Math.asin(matrix.m21) / (2 * Math.PI) * 360;
};

const dragableTouchmove = (coordinates, element, offset, lastLocation) => {
  const pos = { x: coordinates.x + offset.x, y: coordinates.y + offset.y };
  const newLocation = { x: pos.x, y: pos.y, time: Date.now() };
  const translation = translationString(pos.x, pos.y);
  const rotCalc = calcSpeed(lastLocation, newLocation).x / 1000;
  const rotation = rotationString(rotCalc * settings.maxTilt);
  element.style.transform = translation + rotation;
  return newLocation;
};

const touchCoordinatesFromEvent = (e) => {
  const touchLocation = e.targetTouches[0];
  return { x: touchLocation.clientX, y: touchLocation.clientY };
};

const mouseCoordinatesFromEvent = (e) => {
  return { x: e.clientX, y: e.clientY };
};

const TinderCard = React.forwardRef(
  ({ flickOnSwipe = true, children, onSwipe, onCardLeftScreen, className, preventSwipe = [] }, perentRef) => {
    const swipeAlreadyReleased = useRef(false);
    const elementGlobal = useRef(null);

    useImperativeHandle(perentRef, () => ({
      async swipe(dir = 'right') {
        if (onSwipe) onSwipe(dir);
        const power = 1000;
        const disturbance = (Math.random() - 0.5) * 100;
        if (dir === 'right') {
          await animateOut(elementGlobal.current, { x: power, y: disturbance }, true);
        } else if (dir === 'left') {
          await animateOut(elementGlobal.current, { x: -power, y: disturbance }, true);
        } else if (dir === 'up') {
          await animateOut(elementGlobal.current, { x: disturbance, y: power }, true);
        }
        elementGlobal.current.style.display = 'none';
        if (onCardLeftScreen) onCardLeftScreen(dir);
      },
    }));

    const handleSwipeReleased = useCallback(
      async (element, speed) => {
        if (swipeAlreadyReleased.current) {
          return;
        }
        swipeAlreadyReleased.current = true;

        if (Math.abs(speed.x) > settings.swipeThreshold || Math.abs(speed.y) > settings.swipeThreshold) {
          const dir = getSwipeDirection(speed);

          // Skip null direction (down swipe or invalid direction)
          if (!dir) {
            animateBack(element);
            return;
          }

          if (onSwipe) onSwipe(dir);

          if (flickOnSwipe) {
            if (!preventSwipe.includes(dir)) {
              await animateOut(element, speed);
              element.style.display = 'none';
              if (onCardLeftScreen) onCardLeftScreen(dir);
              return;
            }
          }
        }

        animateBack(element);
      },
      [flickOnSwipe, onSwipe, onCardLeftScreen, preventSwipe]
    );

    const handleSwipeStart = useCallback(() => {
      swipeAlreadyReleased.current = false;
    }, []);

    useEffect(() => {
      const element = elementGlobal.current;
      if (!element) return;

      let offset = { x: null, y: null };
      let speed = { x: 0, y: 0 };
      let lastLocation = { x: 0, y: 0, time: Date.now() };
      let mouseIsClicked = false;

      const onTouchStart = (ev) => {
        ev.preventDefault();
        handleSwipeStart();
        offset = { x: -touchCoordinatesFromEvent(ev).x, y: -touchCoordinatesFromEvent(ev).y };
      };

      const onMouseDown = (ev) => {
        ev.preventDefault();
        mouseIsClicked = true;
        handleSwipeStart();
        offset = { x: -mouseCoordinatesFromEvent(ev).x, y: -mouseCoordinatesFromEvent(ev).y };
      };

      const onTouchMove = (ev) => {
        ev.preventDefault();
        const newLocation = dragableTouchmove(touchCoordinatesFromEvent(ev), element, offset, lastLocation);
        speed = calcSpeed(lastLocation, newLocation);
        lastLocation = newLocation;
      };

      const onMouseMove = (ev) => {
        ev.preventDefault();
        if (mouseIsClicked) {
          const newLocation = dragableTouchmove(mouseCoordinatesFromEvent(ev), element, offset, lastLocation);
          speed = calcSpeed(lastLocation, newLocation);
          lastLocation = newLocation;
        }
      };

      const onTouchEnd = (ev) => {
        ev.preventDefault();
        handleSwipeReleased(element, speed);
      };

      const onMouseUp = (ev) => {
        if (mouseIsClicked) {
          ev.preventDefault();
          mouseIsClicked = false;
          handleSwipeReleased(element, speed);
        }
      };

      const onMouseLeave = (ev) => {
        if (mouseIsClicked) {
          ev.preventDefault();
          mouseIsClicked = false;
          handleSwipeReleased(element, speed);
        }
      };

      element.addEventListener('touchstart', onTouchStart);
      element.addEventListener('mousedown', onMouseDown);
      element.addEventListener('touchmove', onTouchMove);
      element.addEventListener('mousemove', onMouseMove);
      element.addEventListener('touchend', onTouchEnd);
      element.addEventListener('mouseup', onMouseUp);
      element.addEventListener('mouseleave', onMouseLeave);

      return () => {
        element.removeEventListener('touchstart', onTouchStart);
        element.removeEventListener('mousedown', onMouseDown);
        element.removeEventListener('touchmove', onTouchMove);
        element.removeEventListener('mousemove', onMouseMove);
        element.removeEventListener('touchend', onTouchEnd);
        element.removeEventListener('mouseup', onMouseUp);
        element.removeEventListener('mouseleave', onMouseLeave);
      };
    }, [handleSwipeStart, handleSwipeReleased]);

    return <div ref={elementGlobal} className={className}>{children}</div>;
  }
);

export default TinderCard;
