---
date: '2023-10-31'
title: '콜바이밸류 vs 콜바이레퍼런스 ref와 out 차이'
categories: ['C샵']
summary: 'Call by value (값에 의한 전달) : 값만 보내니, 보잰 값을 아무리 바꿔도 원본 값은 안 바뀐다.
Call by reference (참조에 의한 전달) : 원본 값의 주소를 보내니, 값을 바꾸면 원본도 바뀐다.'
thumbnail: './image/callbyvaluevscallbyrefrence.png'
---

# 콜바이밸류 vs 콜바이레퍼런스 ref와 out 차이

> 1. **Call by value (값에 의한 전달)** : 값만 보내니, 보잰 값을 아무리 바꿔도 원본 값은 안 바뀐다.
> 2. **Call by reference (참조에 의한 전달)** : 원본 값의 주소를 보내니, 값을 바꾸면 원본도 바뀐다.

## 1. 콜바이밸류 (Call by value)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



class 바꿔치기
{
    public void Change(int 위스키남은양)
    {
        int 맥주 = 1000;
        위스키남은양 = 맥주;
    }
}

class 불속성효자
{
    public static void Main(string[] args)
    {
        int 위스키남은양 = 0; //아빠의 위스키를 다 먹은 상황

        바꿔치기 change = new 바꿔치기();
        change.Change(위스키남은양);
        Console.WriteLine("위스키 남은양 : " + 위스키남은양);
    }
}
```

---

원본값이 바뀌지 않아서 아들은 콜바이레퍼런스 방식으로 주소를 전달하도록 함수를 수정하였다.

## 2. 콜바이레퍼런스 (Call by reference)

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



class 바꿔치기
{
    public void Change(ref int 위스키남은양) // 주소값을 받음
    {
        int 맥주 = 1000;
        위스키남은양 = 맥주;
    }
}

class 불속성효자
{
    public static void Main(string[] args)
    {
        int 위스키남은양 = 0; //아빠의 위스키를 다 먹은 상황

        바꿔치기 change = new 바꿔치기();
        change.Change(ref 위스키남은양); // 주소값을 보냄
        Console.WriteLine("위스키 남은양 : " + 위스키남은양);
    }
}
```

---

### C#의 Call by reference 방식은 ref 외에도 out도 존재한다.

## ref와 out의 차이

**ref** : ref는 함수 외부 -> 함수 내부로 주소를 전달할 때 사용하는 참조 키워드
**out** : out은 함수 내부 -> 함수 외부로 주소가 나갈 때 사용하는 참조 키워드

> - 따라서 ref 변수는 반드시 초기화가 필요하다
>   -> 초기화를 하지 않으면 쓰래기 값이 함수 내부로 전달 됨(오류 발생)

### ref예제

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


class Call
{
    static void 함수내부(ref int x)
    {
        x = 1234;
    }


    public static void Main(string[] args)
    {
        int x1 = 0; // 변수를 초기화 함
        함수내부(ref x1);
        Console.WriteLine(x1);
    }
}
```

---

### out예제

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


class Call
{
    static void 함수내부(out int x)
    {
        x = 1234;
    }


    public static void Main(string[] args)
    {
        int x1; // 변수를 초기화 하지 않음
        함수내부(out x1);
        Console.WriteLine(x1);
    }
}
```

---
