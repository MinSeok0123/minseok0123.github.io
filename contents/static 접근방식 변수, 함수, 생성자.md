---
date: '2023-11-02'
title: 'static 접근방식 변수, 함수, 생성자'
categories: ['C샵']
summary: '일반 맴버 변수는 객체를 생성해야지만 메모리가 생성된다. (별도로 메모리를 할당해야 접근가능)
하지만 스태틱 변수는 객체 생성 이전에 접근할 수 있다. (프로그램 시작과 동시에 가장 먼저 할당)'
thumbnail: './image/static.png'
---

# static 접근방식 변수, 함수, 생성자

**일반 맴버 변수**는 객체를 생성해야지만 메모리가 생성된다. _(별도로 메모리를 할당해야 접근가능)_  
하지만 **스태틱 변수**는 객체 생성 이전에 접근할 수 있다. _(프로그램 시작과 동시에 가장 먼저 할당)_

## 1. Static 변수 : 객체생성 X

- 특징 : **클래스명**으로 바로 접근 (프로그램 시작과 동시에 접근 가능)

## 2. 일반 맴버 변수 : 객체생성 O

- 특징 : **객체를 생성**해야만 메모리가 생성된다. (별도로 메모리를 할당하는 과정 -> 접근가능)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


// 다른 클래스
public class Access
{
    public static int 스태틱변수 = 0;
    public int 일반변수 = 0;
}

class main
{
    public static void Main(string[] args)
    {
        // 스태틱 변수 : 바로 다이렉트로 클래스명으로 접근가능
        Access.스태틱변수 = 1; // 객체생성을 안해도, 프로그램이 시작되면 이미 메모리가 할당되어 있다.

        // 이 코드는 쓰레기에요!
        Access.일반변수 = 2; // 별도로 메모리를 할당한 뒤에야 접근 가능


        // 이 코드는 사용할 수 있어요!
        Access 객체 = new Access(); //메모리를 할당
        객체.일반변수 = 2;

        Console.WriteLine(객체.일반변수); // 일반 변수
        Console.WriteLine(Access.스태틱변수); // 스태틱 변수
    }
}
```

---

# static 함수 vs 일반 함수 접근 차이

### [Static 맴버 함수]와 [일반 멤버 함수] 접근 방식의 차이

- 사실 위에서 언급한 변수 접근 방식의 차이와 비슷하다

### [스태틱 맴버 함수에서 주의할 점]

- 스태틱 함수를 이용해서 일반 멤버 필드에 접근 불가
  이유 : 일반 멤버 필드는 객체 생성 후에 존재하기 때문에 스태틱 함수에서는 접근 불가

---

# 스태틱 생성자

1. 생성자를 **static** 생성자로 선언할 수도 있다.
   그러나 **static** 생성자에서는 일반 변수는 쓸 수 없다.

- 일반 멤버 변수는 객체를 생성해야만 메모리가 생성된다.
- 하지만 스태틱 함수는 객체 생성 이전에 접근할 수 있기 때문

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


// class 선언 : 스태틱 변수, 일반 변수
class 테스트
{
    public static int 스태틱변수 = 0;
    public int 일반변수 = 0;


    // 1. static 생성자 함수
    static 테스트()
    {
        // 일반변수 = 10;
        스태틱변수 = 10;

        Console.WriteLine("[1. static 생성자 최초 실행]");
    }

    // 2. 일반 생성자 함수
    public 테스트()
    {
        일반변수 = 20;
        스태틱변수 = 20;

        Console.WriteLine("[2. 일반 생성자 최초 실행]");
    }
}


class main
{
    static void Main(String[] args)
    {
        // 스태틱 변수를 호출할 경우: static 생성자만 호출됩니다.
        테스트.스태틱변수 = 100; // 실행시 결과 = [1. static 생성자 최초 실행]가 실행된다.


        테스트 test = new 테스트(); // 실행시 결과 = [1. static 생성자 최초 실행], [2. 일반 생성자 최초 실행]가 실행된다.
    }
}

```
