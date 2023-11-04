---
date: '2023-11-04'
title: '오버로딩(Over loading)'
categories: ['C샵']
summary: '하나의 이름으로 여러 개의 함수를 만드는 기법
[오버로딩(Over loading)을 사용하는 이유]
함수의 이름 하나로 여러 가지 작업에 대처할 수 있다.'
thumbnail: './overload.png'
---


# 오버로딩(Over loading)

> **오버로딩(Over loading)**
하나의 이름으로 여러 개의 함수를 만드는 기법

## [오버로딩(Over loading)을 사용하는 이유]

**함수**의 이름 **하나**로 **여러 가지 작업**에 대처할 수 있다.

(오버로딩이 없을 경우,
매개변수에 int 형이 들어오는 함수 따로,
double형이 들어오는 함수 따로 만들어줘야 하므로 귀찮다)



# 오버로딩을 하지 않은 경우


**오버로딩**을 안한 개판 1분전 소스코드

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class 스트리머의_하루
{
    // 무수히 많은 함수들이 존재.
    
    // 후원 관련 함수들
    public int 정기구독받기(int 정기구독)
    {
        return 정기구독;
    }

    public int 정기구독_음성도네(int 정기구독, int 음성도네)
    {
        return 정기구독 + 음성도네;
    }

    // 새 후원방식이 또 생겨서 (오버로딩을 안쓸 경우 : 별도의 함수 만듬)
    public int 정기구독_음성도네_영상도네받기(int 정기구독, int 음성도네, int 영상도네)
    {
        return 정기구독 + 음성도네 + 영상도네;
    }

    // 기타 잡다한 함수들
    public double 택배받기(double 택배) // 2.2kg~
    {
        return 택배;
    }

    public string 편지받기(string 편지)
    {
        return 편지;
    }
}

public class 오늘수익
{
    public static void Main(string[] args)
    {
        // 방송 켬
        스트리머의_하루 getMoney = new 스트리머의_하루();

        // 트수들이 후원중
        int 오늘수익 = 0;
        오늘수익 += getMoney.정기구독받기(5000); // OOO님이 1개월 구독으로 돈을 버리셨습니다.
        오늘수익 += getMoney.정기구독_음성도네(5000, 1000); // 구독 + 음성도네
        오늘수익 += getMoney.정기구독_음성도네_영상도네받기(5000, 1000, 20000);

        // 수익금 정산
        Console.WriteLine("오늘수익 수익: {0}", 오늘수익);
    }
}
```



그러자 함수가 많아질수록 다른 함수와 섞이고 코드가 지저분해지면서 복잡해졌고,
결국 스트리머는 **오버로딩**을 이용해서
**"모든 후원금을 하나의 함수명"**으로 관리하기로 결정하게 되었다.

---

# 오버로딩을 한 경우

**오버로딩**을 한 소스코드

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class 스트리머의_하루
{
    // 무수히 많은 함수들이 존재.
    
    // 후원 관련 함수들
    public int 후원받기(int 정기구독)
    {
        return 정기구독;
    }

    public int 후원받기(int 정기구독, int 음성도네)
    {
        return 정기구독 + 음성도네;
    }

    public int 후원받기(int 정기구독, int 음성도네, int 영상도네)
    {
        return 정기구독 + 음성도네 + 영상도네;
    }

    // 기타 잡다한 함수들
    public double 후원받기(double 택배) // 2.2kg~
    {
        return 택배;
    }

    public string 후원받기(string 편지)
    {
        return 편지;
    }
}

public class 오늘수익
{
    public static void Main(string[] args)
    {
        // 방송 켬
        스트리머의_하루 getMoney = new 스트리머의_하루();

        // 트수들이 후원중
        int 오늘수익 = 0;
        오늘수익 += getMoney.후원받기(5000); // OOO님이 1개월 구독으로 돈을 버리셨습니다.
        오늘수익 += getMoney.후원받기(5000, 1000); // 구독 + 음성도네
        오늘수익 += getMoney.후원받기(5000, 1000, 20000);

        // 집으로 날아온 택배선물
        double 오늘택배 = 0;
        오늘택배 += getMoney.후원받기(5.5); // 5.5kg의 거대한 선물이 도착했다.
        오늘택배 += getMoney.후원받기(2.2);
        오늘택배 += getMoney.후원받기(0, 5);

        string 오늘편지 = "";
        오늘편지 += getMoney.후원받기("안녕하세요");

        // 하루 종료
        Console.WriteLine("오늘수익 : {0}", 오늘수익);
        Console.WriteLine("오늘택배 : {0}", 오늘택배);
        Console.WriteLine("오늘편지 : {0}", 오늘편지);
    }

}
```
---

