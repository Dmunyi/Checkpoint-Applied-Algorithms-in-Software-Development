function dijkstra(graph, start) {
    const distances = {}; // To store the shortest distances
    const visited = {}; // To keep track of visited nodes
  
    // Set initial values
    for (const vertex in graph) {
      if (graph.hasOwnProperty(vertex)) {
        distances[vertex] = Infinity;
        visited[vertex] = false;
      }
    }
    distances[start] = 0;
  
    const unvisitedNodes = new PriorityQueue();
    unvisitedNodes.enqueue(start, 0);
  
    while (!unvisitedNodes.isEmpty()) {
      const current = unvisitedNodes.dequeue();
      if (!visited[current]) {
        visited[current] = true;
  
        for (const neighbor in graph[current]) {
          if (graph[current].hasOwnProperty(neighbor)) {
            const edgeWeight = graph[current][neighbor];
            const tentativeDistance = distances[current] + edgeWeight;
  
            if (tentativeDistance < distances[neighbor]) {
              distances[neighbor] = tentativeDistance;
              unvisitedNodes.enqueue(neighbor, tentativeDistance);
            }
          }
        }
      }
    }
  
    return distances;
  }
  
  // A simple PriorityQueue class for handling the priority queue in Dijkstra's algorithm
  class PriorityQueue {
    constructor() {
      this.elements = [];
    }
  
    enqueue(item, priority) {
      this.elements.push({ item, priority });
      this.elements.sort((a, b) => a.priority - b.priority);
    }
  
    dequeue() {
      return this.elements.shift().item;
    }
  
    isEmpty() {
      return this.elements.length === 0;
    }
  }
  
  const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
  };
  
  console.log(dijkstra(graph, 'A'));