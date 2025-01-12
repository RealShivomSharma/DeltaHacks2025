# utils/auth.py


def hash_password(password: str) -> str:
    # Example stub
    # from passlib.hash import bcrypt
    # return bcrypt.hash(password)
    return password


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # Example stub
    # return bcrypt.verify(plain_password, hashed_password)
    return plain_password == hashed_password
