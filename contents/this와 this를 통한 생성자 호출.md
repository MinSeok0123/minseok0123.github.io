---
date: '2023-11-07'
title: 'this와 this를 통한 생성자 호출'
categories: ['C샵']
summary: 'this
클래스 내에서 정의된 맴버를 가르킬때 사용한다.
만약 클래스 내에서 생성된 변수와 매개변수의 이름이 똑같다면
	- this를 붙이면 클래스 내에서 생성된 변수를 출력한다.
	- this를 빼면 매개변수를 출력한다.'
thumbnail: './image/C#.png'
---

# this와 this를 통한 생성자 호출

## this

**클래스 내**에서 정의된 **맴버**를 가르킬때 사용한다.

> 만약 클래스 내에서 생성된 변수와 매개변수의 이름이 똑같다면

    - this를 붙이면 클래스 내에서 생성된 변수를 출력한다.
    - this를 빼면 매개변수를 출력한다.

### 코드

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


public class ThisTest
{
    private string name = "하이";

    public ThisTest(String name)
    {
        Console.WriteLine(name);
        Console.WriteLine(this.name);
    }

    public static void Main(string[] args)
    {
        ThisTest a = new ThisTest("바이");
    }
}

```

---

# this를 통한 생성자 호출

> 생성자를 여러개 만든 경우, 그 중 조건에 맞는 생성자만 호출이 된다.
> 이때, this를 사용해서 여러개의 생성자를 한꺼번에 호출할 수 있다.

## 1. this를 사용 안해서 매번 따로따로 생성자 함수를 호출하는 경우

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


public class 알바호출
{
    // 1번 생성자
    public 알바호출()
    {
        Console.WriteLine("[1번 생성자 호출]");
        Console.WriteLine("계산대에서 멍때리기\n\n");
    }
    // 2번 생성자
    public 알바호출(string clean)
    {
        Console.WriteLine("[2번 생성자: 매개변수가 1개]");
        Console.WriteLine("사장 왈: " + clean + "\n\n");
    }
    // 3번 생성자
    public 알바호출(string clean, int calculation)
    {
        Console.WriteLine("[3번 생성자: 매개변수가 2개]");
        Console.WriteLine("손님 왈: 계산 좀 해주세요~ " + calculation);
        Console.WriteLine("사장 왈: " + clean + "\n\n");
    }

    public static void Main(string[] args)
    {
        // 알바호출1
        알바호출 call1 = new 알바호출();
        // 알바호출2
        알바호출 call2 = new 알바호출("알바야 청소 좀 해라");
        // 알바호출3
        알바호출 call3 = new 알바호출("알바야 청소 좀 해라", 5000);
    }
}
```

---

## 2. this를 사용해서 한방에 3개의 생성자 함수를 호출하는 경우

하지만 혼자서 여러가지 일을 처리하는 것이 불만이었던 알바는
분신술을 사용해서 자신을 여러명 소환한 뒤, 한꺼번에 여러가지 일을 처리하기로 했다.
this를 사용해서 한꺼번에 여러개의 생성자 함수를 호출

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


public class 알바호출
{
    // 1번 생성자
    public 알바호출() : this ("분신술 사용")
    {
        Console.WriteLine("[1번 생성자 호출]");
        Console.WriteLine("계산대에서 멍때리기\n\n");
    }
    // 2번 생성자
    public 알바호출(string clean) : this ("또 분신술 사용", 5000)
    {
        Console.WriteLine("[2번 생성자: 매개변수가 1개]");
        Console.WriteLine("사장 왈: " + clean + "\n\n");
    }
    // 3번 생성자
    public 알바호출(string clean, int calculation)
    {
        Console.WriteLine("[3번 생성자: 매개변수가 2개]");
        Console.WriteLine("손님 왈: 계산 좀 해주세요~ " + calculation);
        Console.WriteLine("사장 왈: " + clean + "\n\n");
    }

    public static void Main(string[] args)
    {
        // 알바호출1
        알바호출 call1 = new 알바호출();
    }
}
```

### 상속 배울때 나온 예제

> [할아버지 -> 아빠 -> 아들] 순서로 실행되는 것처럼
> 생성자도 [3번 -> 2번 -> 1번] 순서로 호출되게 된다.

---
