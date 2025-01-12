import networkx as nx


class HousingRecommender:
    def __init__(self):
        self.G = nx.Graph()

    def add_user(self, user_id):
        self.G.add_node(("user", user_id))

    def add_house(self, house_id):
        self.G.add_node(("house", house_id))

    def user_likes_house(self, user_id, house_id):
        self.G.add_edge(("user", user_id), ("house", house_id), weight=1)

    def recommend_houses_for_user(self, user_id, top_k=5):
        # Example: find neighbor-of-a-neighbor houses that the user hasn’t seen
        neighbors = list(self.G.neighbors(("user", user_id)))
        recommended = []
        for neighbor in neighbors:
            if neighbor[0] == "house":
                # Already liked that house
                continue
            # neighbor is another user
            houses_liked_by_neighbor = [
                n for n in self.G.neighbors(neighbor) if n[0] == "house"
            ]
            recommended.extend(houses_liked_by_neighbor)
        recommended = list(set(recommended))  # unique
        return recommended[:top_k]
