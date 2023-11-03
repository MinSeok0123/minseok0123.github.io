---
date: '2023-11-03'
title: 'const 상수와 readonly 상수 차이'
categories: ['C샵']
summary: '상수 : 변수와는 달리 변경이 불가능하다. (예) 10 = 100;
const 키워드 : 상수를 선언하는 키워드이다.'
thumbnail: './constVSreadonly.png'
---

# const상수와 readonly 상수 차이

## const 상수

- 상수 : 변수와는 달리 변경이 불가능하다. (예) 10 = 100;
- const 키워드 : 상수를 선언하는 키워드이다.

### [const의 특징]

1. 자동 static (static으로 선언하지 않아도 자동으로 static이 된다)
2. 반드시 초기화 (초기화하지 않으면 에러가 발생한다)
3. 초기화후 변경 불가 (const 상수는 단 한번만 초기화가 가능하다)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


public class ConstSample
{
    public const double 로켓공식 = 3.14; // 절대로 바뀌면 안되는 정보

    public void 함수()
    {
        //로켓공식 = 4.2213; // 정수가 아니라 상수라서 값을 바꿀 수 없다
    }
}

public class ConstTest
{
    public static void Main(string[] args)
    {
        Console.WriteLine(ConstSample.로켓공식);

        // 객체 선언해서 메모리 할당X -> static이기 때문에 프로그램이 시작하자마자 바로 메모리가 할당되므로
        // 다이렉트로 접근 가능!
    }
}
```

## readonly 상수

### const 와의 차이점 (readonly 상수의 특징)

1. 반드시 초기화할 필요없다.
2. 생성자에서 딱 한번 값을 할당할 수 있다.
3. const와는 다르게 자동으로 static이 되지 않는다.
   - static 키워드를 사용하면 스태틱 상수가 된다.
   - static 키워드를 사용하지 않으면 일반 상수가 된다.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


public class 로켓외부요인
{
    // readonly 스태틱 방식
    // readonly 일반 방식

    public readonly static int 날씨맑음_STATIC_READONLY; // readonly로 선언한 상수 : 초기화를 안시켜도 에러가 안남
    public readonly int 날씨흐림_NORMAL_READONLY;

    // 1. static 생성자
    static 로켓외부요인()
    {
        // readonly에서는 static은 static끼리 할당 가능함
        날씨맑음_STATIC_READONLY = 100;
        //날씨흐림_NORMAL_READONLY = 200; // static이 아니라서 할당 불가능
    }
    // 2. 일반 생성자
    로켓외부요인(int 바람세기)
    {
        //날씨맑음_STATIC_READONLY = 100; // static이라서 할당 불가능
        날씨흐림_NORMAL_READONLY = 바람세기;
    }

    public static void Main(string[] args)
    {
        // 1. static readonly 호출 : static 호출방식 (별도의 메모리 할당과정 없이 바로 사용)
        Console.WriteLine(로켓외부요인.날씨맑음_STATIC_READONLY);

        // 2. normal readonly 호출 : 일반 호출방식 (객체를 만들어서 메모리를 할당한 뒤에 사용 가능)
        로켓외부요인 normal = new 로켓외부요인(1000);
        Console.WriteLine(normal.날씨흐림_NORMAL_READONLY);

    }
}
```
