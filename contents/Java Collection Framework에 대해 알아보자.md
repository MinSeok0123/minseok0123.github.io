---
date: '2023-03-29'
title: 'Java Collection Framework에 대해 알아보자'
categories: ['Java']
summary: 'Java Collection Framework는 자바에서 제공하는 데이터 구조와 관련된 클래스와 인터페이스의 집합이다. 이것은 다양한 자료구조의 구현을 제공하고, 컬렉션 클래스를 사용하여 데이터를 저장, 검색, 정렬, 삭제 등 다양한 연산을 수행할 수 있다. 여기서는 컬렉션 프레임워크의 중요한 두 가지 클래스인 ArrayList와 HashMap에 대해 알아보겠다.'
thumbnail: './image/java.png'
---

# Java Collection Framework
Java Collection Framework는 자바에서 제공하는 데이터 구조와 관련된 클래스와 인터페이스의 집합이다. 이것은 다양한 자료구조의 구현을 제공하고, 컬렉션 클래스를 사용하여 데이터를 저장, 검색, 정렬, 삭제 등 다양한 연산을 수행할 수 있다. 여기서는 컬렉션 프레임워크의 중요한 두 가지 클래스인 ArrayList와 HashMap에 대해 알아보겠다.

**List** : List 인터페이스는 순서가 있는 컬렉션을 나타내며, 데이터를 중복해서 저장할 수 있습니다. ArrayList, LinkedList, Vector 등이 이에 해당합니다.

**Set** : Set 인터페이스는 순서가 없는 컬렉션을 나타내며, 데이터를 중복해서 저장할 수 없습니다. HashSet, TreeSet 등이 이에 해당합니다.

**Map** : Map 인터페이스는 키-값 쌍으로 이루어진 데이터를 저장합니다. HashMap, TreeMap 등이 이에 해당합니다.


# 1. 메모리 구조와 함께 파악하기

ArrayList와 HashMap은 모두 컬렉션 클래스이지만, 메모리 구조는 다르다.

## ArrayList
ArrayList는 내부적으로 배열을 사용하여 요소를 저장한다. 요소가 추가될 때마다 배열의 크기가 자동으로 증가하며, 요소가 제거될 때마다 배열의 크기가 자동으로 감소한다. 이러한 메모리 구조는 다음과 같다.

![](https://velog.velcdn.com/images/minseok0123/post/16e13dc3-0295-4be9-8e41-23b9331bc115/image.png)


## HashMap
HashMap은 내부적으로 해시 테이블을 사용하여 요소를 저장한다. 해시 테이블은 해시 함수를 사용하여 각 요소를 키-값 쌍으로 매핑하고, 각 키에 대한 값을 해시 테이블 내의 해당 위치에 저장한다. 이러한 메모리 구조는 다음과 같다.

![](https://velog.velcdn.com/images/minseok0123/post/6d4ce393-be97-4756-b243-257999d1fd85/image.png)


# 2. Code (Java)

## ArrayList
```
import java.util.ArrayList;

public class ArrayListExample {

    public static void main(String[] args) {
        // ArrayList 생성
        ArrayList<String> names = new ArrayList<>();

        // 요소 추가
        names.add("Mcdonald");
        names.add("BugerKing");
        names.add("LotteRia");

        // 요소 접근
        System.out.println(names.get(0)); // 출력: Mcdonald

        // 요소 수정
        names.set(1, "Shack Shack");

        // 요소 제거
        names.remove(2);

        // 전체 출력
        for (String name : names) {
            System.out.println(name);
        }
    }

}

```


## HashMapp
```
import java.util.HashMap;

public class HashMapExample {

    public static void main(String[] args) {
        // HashMap 생성
        HashMap<String, Integer> ages = new HashMap<>();

        // 요소 추가
        ages.put("Mcdonald", 82);
        ages.put("BugerKing", 69);
        ages.put("LotteRia", 43);

        // 요소 접근
        System.out.println(ages.get("BugerKing")); // 출력: 69

        // 요소 수정
        ages.replace("LotteRia", 44);

        // 요소 제거
        ages.remove("Mcdonald");

        // 전체 출력
        for (String name : ages.keySet()) {
            System.out.println(name + ": " + ages.get(name));
        }
    }

}

```
