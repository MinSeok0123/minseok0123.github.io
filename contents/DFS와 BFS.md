---
date: '2023-05-15'
title: 'DFS와 BFS'
categories: ['알고리즘', 'Python']
summary: '루트 노드(혹은 다른 임의의 노드)에서 시작해서 다음 분기(branch)로 넘어가기 전에 해당 분기를 완벽하게 탐색하고 넘어가는 방법.넓게(wide) 탐색하기 전에 깊게(deep) 탐색한다.모든 노드를 방문 하고자 하는 경우에 이 방법을 사용한다.'
thumbnail: './image/DFS AND BFS.png'
---

# DFS

**루트 노드(혹은 다른 임의의 노드)에서 시작해서 다음 분기(branch)로 넘어가기 전에 해당 분기를 완벽하게 탐색하고 넘어가는 방법.** 넓게(wide) 탐색하기 전에 **깊게(deep)** 탐색한다.**모든 노드를 방문 하고자 하는 경우**에 이 방법을 사용한다.
`DFS가` `BFS`보다 좀 더 간단하다.단순 검색 속도 자체는 BFS에 비해서 느리다.
스택이나 재귀 함수를 통해서 구현할 수 있는데 재귀 함수가 구현이 간편하므로 대부분 재귀 함수로 구현한다.

- 구현할 때 주의할 점 : 그래프 탐색의 경우 어떤 노드를 방문했었는지 여부를 반드시 검사 해야 한다.
  - 이를 검사하지 않을 경우 무한루프에 빠질 위험이 있다.

### DFS 알고리즘 구현방식

![](https://velog.velcdn.com/images/minseok0123/post/be4be19c-dce2-4c21-9d57-b499d69f729e/image.png)

1. a 노드(시작 노드)를 방문

- 방문한 노드는 방문했다고 체크한다!

2. a와 인접한 노드들을 차례로 순회

- a와 인접한 노드가 없다면 종료

3. a와 이웃한 노드 b를 방문했다면, a와 인접한 또 다른 노드를 방문하기 전에 b의 이웃 노드들을 전부 방문해야 한다.

- b를 시작 정점으로 DFS를 다시 시작하여 b의 이웃 노드들을 방문한다.

4. b의 분기를 전부 완벽하게 탐색했다면 다시 a에 인접한 정점들 중에서 아직 방문이 안 된 정점을 찾는다.

- 즉, b의 분기를 전부 완벽하게 탐색한 뒤에야 a의 다른 이웃 노드를 방문할 수 있다는 뜻이다.
- 아직 방문이 안 된 정점이 없으면 종료
- 있으면 다시 그 정점을 시작 정점으로 DFS를 시작!

```python
void search(Node root) {
  if (root == null) return;

  // 1. root 노드 방문
  visit(root);
  root.visited = true; // 1-1. 방문한 노드를 표시

  // 2. root 노드와 인접한 정점을 모두 방문
  for each (Node n in root.adjacent) {
    if (n.visited == false) { // 4. 방문하지 않은 정점을 찾는다.
      search(n); // 3. root 노드와 인접한 정점 정점을 시작 정점으로 DFS를 시작
    }
  }
}
```

---

```python
graph = [[0],
         [2, 3, 8],
         [1, 7],
         [1, 4, 5],
         [3, 5],
         [3, 4],
         [7],
         [2, 6, 8],
         [1, 7]]

visited = [False] * 9
def dfs(v, graph, visited):
    visited[v] = True
    print(v, end=" ")
    for node in graph[v]:
        if not visited[node]:
            dfs(node, graph, visited)


dfs(1, graph, visited)
```

### DFS의 장점

- 현재 경로상의 노드들만 기억하면 되므로, 저장 공간의 수요가 비교적 적음
- 목표 노드가 깊은 단계에 있는 경우 해를 빨리 구할 수 있음
- 구현이 너비 우선 탐색(BFS) 보다 간단함

### DFS의 단점

- 단순 검색 속도는 너비 우선 탐색(BFS) 보다 느림
- 해가 없는 경우에 빠질 가능성이 있음(사전에 임의의 깊이를 지정한 후 탐색하고, 목표 노드를 발견하지 못할 경우 다음 경로를 탐색하도록 함)
- 깊이 우선 탐색은 해를 구하면 탐색이 종료되므로, 구한 해가 최단 경로가 된다는 보장이 없음(목표에 이르는 경로가 다수인 경우 구한 해가 최적이 아닐 수 있음)

### DFS의 시간 복잡도

- DFS는 그래프(정점의 수: N, 간선의 수: E)의 모든 간선을 조회한다.
  - 인접 리스트로 표현된 그래프: O(N+E)
  - 인접 행렬로 표현된 그래프: O(N^2)

# BFS

그래프 전체를 탐색하는 방법 중 하나.루트 노드 (혹은 다른 임의의 노드)에서 시작해서 인접한 노드를 먼저 탐색하는 방법.시작 정점으로부터 가까운 정점을 먼저 방문하고 멀리 떨어져 있는 정점을 나중에 방문하는 순회방법.종이에 먹물이 퍼지는 것과 같음.즉, 깊게(deep) 탐색하기 전에 넓게(wide) 탐색한다 !BFS가 진행될수록 탐색 범위는 출발점에서 멀어진다.
주로 두 노드 사이의 최단 경로 혹은 임의의 경로를 찾고 싶을 때 사용하는 방법이다.(최단 경로, 길찾기)방문한 노드들을 차례대로 저장한 후 꺼낼 수 있는 자료구조인 Queue를 사용한다.

### queue

Queue는 **선입선출(FIFO, Fisrt In First Out)** 자료구조.먼저 들어온 것이 먼저 나간다.고속도로 톨게이트를 생각하자.

- 특징
  - 재귀적으로 동작하지 않는다.
  - 어떤 노드를 방문했었는지 여부를 반드시 검사해야 한다.
  - 검사하지 않을 경우 무한루프에 빠질 위험이 있다.
- 장점
  - 로직이 단순하다.
  - 최초 발견 루트를 최단 경로라고 보장할 수 있다.
  - 노드의 숫자가 적고, 깊이가 얕은 경우 -> 단순검색속도가 DFS보다 빠르다.
- 단점
  - 비교적 많은 저장 공간이 필요하다.

### BFS 알고리즘 구현방식

**큐**를 활용해서 구현.
![](https://velog.velcdn.com/images/minseok0123/post/e38ad96a-db7a-47cf-a9fd-4f82318c78c6/image.png)

1. a 노드(시작 노드)를 방문. (방문한 노드 체크)

- 큐에 방문한 노드를 삽입. `enqueue`
- 초기 상태의 큐에는 시작 노드만 저장되어 있다.
  - 즉, a노드의 이웃 노드를 모두 방문한 다음에 이웃의 이웃들을 방문한다 !

2. 큐에서 꺼낸 노드와 인접한 노드들을 모두 차례대로 방문.

- 큐에서 꺼낸 노드를 방문
- 큐에서 꺼낸 노드와 인접한 노드들을 방문
  - 인접한 노드가 없다면 큐의 앞에서 노드를 꺼낸다. `dequeue`
- 큐에 방문된 노드를 삽입. `enqueue`

3. 큐가 다 소진될 때까지 계속 반복.

```python
void search(Node root) {
  Queue queue = new Queue();
  root.marked = true; // (방문한 노드 체크)
  queue.enqueue(root); // 1-1. 큐의 끝에 추가

  // 3. 큐가 소진될 때까지 계속한다.
  while (!queue.isEmpty()) {
    Node r = queue.dequeue(); // 큐의 앞에서 노드 추출
    visit(r); // 2-1. 큐에서 추출한 노드 방문
    // 2-2. 큐에서 꺼낸 노드와 인접한 노드들을 모두 차례로 방문한다.
    foreach (Node n in r.adjacent) {
      if (n.marked == false) {
        n.marked = true; // (방문한 노드 체크)
        queue.enqueue(n); // 2-3. 큐의 끝에 추가
      }
    }
  }
}
```

```python
let bfs = function (node) {
    // TODO: 노드의 탐색을 treeBFS 탐색 순으로 배열에 담아내자
    let result = [];
    let queue = [node]; // 조회할 노드를 순차적으로 넣는다.

    // 조회할 노드가 없을때까지
    while (queue.length) {
        let target = queue.shift();
        result.push(target.value);
        // 자식 노드들을 순차적으로 queue에 쌓아준다.
        for (let node of root.children) {
            queue.push(node);
        }

    }
    return result;
};
let Node = function (value) {
    this.value = value;
    this.children = [];
};

// 위 Node 객체로 구성되는 트리는 매우 단순한 형태의 트리.
// membership check(중복 확인)를 따로 하지 않는다.
Node.prototype.addChild = function (child) {
    this.children.push(child);
    return child;
};
```

---

```python
from collections import deque

visited = [False] * 9
graph = [[0],
         [2, 3, 8],
         [1, 7],
         [1, 4, 5],
         [3, 5],
         [3, 4],
         [7],
         [2, 6, 8],
         [1, 7]]

q = deque()

def bfs(start, graph, visited):
    visited[start] = True
    q.append(start)

    while q:
        v = q.popleft()
        print(v, end=" ")
        for i in graph[v]:
            if not visited[i]:
                q.append(i)
                visited[i] = True

bfs(1, graph, visited)
```

### BFS의 장점

- 노드의 수가 적고 깊이가 얕은 경우 빠르게 동작할 수 있다.
- 단순 검색 속도가 DFS보다 빠르다.
- 최단 경로가 존재한다면 어느 한 경로가 무한히 깊어진다고 해도 최단 경로를 반드시 찾을 수 있다.

### BFS의 단점

- 노드의 수가 늘어나면 탐색해야 하는 노드 또한 많아지기 때문에 비현실적이다.
- 재귀호출의 DFS와는 달리 다음에 탐색할 정점들을 큐에 저장해야 하므로 저장공간이 많이 필요하다.

### BFS의 시간 복잡도

- 인접 리스트로 표현된 그래프 : `O(N+E)`
- 인접 행렬로 표현된 그래프 : `O(N^2)`

## 마지막 정리

> DFS (깊이 우선 탐색): 트리나 그래프에서 한 노드의 자식들을 우선으로 탐색하는 방식. 더 이상 자식이 없을 때까지 계속해서 깊이를 우선으로 내려가며 탐색한다.

> BFS (너비 우선 탐색): 트리나 그래프에서 한 노드의 형제들을 우선으로 탐색하는 방식. 같은 레벨에 있는 노드들을 먼저 탐색한 후, 다음 레벨로 이동한다.

> DFS는 스택 또는 재귀 함수를 이용하여 구현할 수 있으며, BFS는 큐를 이용하여 구현할 수 있다.
