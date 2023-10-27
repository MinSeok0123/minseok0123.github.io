---
date: '2023-10-27'
title: 'private에 접근하기, get set과 property 속성'
categories: ['C샵']
summary: '메모리를 보유한 객체를 이용해서 맴버에 점(.)을 찍고 접근할 수 있는지 없는지의 제어를 말한다.'
thumbnail: './Property.png'
---

# private에 접근하기 : get set과 property 속성

## 접근제어란?

> _메모리를 보유한 객체를 이용해서 맴버에 점(.)을 찍고 접근할 수 있는지 없는지의 제어를 말한다._

### public과 private의 차이점은 무엇일까?

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


class 여친 //클래스를 생성한다.
{
    public int 나이 = 25; //퍼블릭으로 나이를 만들고 25라는 값을 넣는다.
    private int 몸무게 = 70; //프라이빗으로 몸무게를 만들고 70이라는 값을 넣는다.
}


namespace @private
{
    internal class Program
    {
        static void Main(string[] args)
        {
            여친 none = new 여친(); //클래스를 인스턴스화 한다. (객체를 메모리에 할당)
            Console.WriteLine("나이 : " + none.나이); //퍼블릭이기 때문에 나이가 접근이 가능해서 출력이 된다.
            Console.WriteLine("몸무게 : " + none.몸무게); //프라이빗이기 때문에 몸무게가 접근이 불가능해 출력이 되지 않는다.
        }
    }
}
```

---

### 그래서 private 맴버에 어떻게 접근하는데?

1. Set : public 맴버 함수의 매개변수(Parameter)를 통해서 private 맴버에 값을 할당
2. Get : public 맴버 함수의 리턴(Return)을 통해서 private 맴버의 값 내보내기

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


class 여친
{
    public int 나이 = 25;
    private int 몸무게 = 70;

    //set 함수
    public void SetWeight(int weight)
    {
        몸무게 = weight;
    }

    //get 함수
    public int GetWeight()
    {
        return 몸무게;
    }
}


namespace @private
{
    internal class Program
    {
        static void Main(string[] args)
        {
            여친 none = new 여친();

            //set 함수를 통해 몸무게에 값을 할당
            none.SetWeight(100);

            //get 함수를 통해 몸무게의 값을 얻어온다
            int a = none.GetWeight();

            Console.WriteLine("나이 : " + none.나이);
            Console.WriteLine("몸무게 : " + a);
        }
    }
}
```

---

위 코드와 값이 함수를 통해서 값을 접근/수정을 할 수 있다.

**그런데 C#에서 이미 내부적으로 get, set이 구현되어 있다.**
결국, 우리가 어렵게 함수를 굳이 안 만들어줘도 갖다 쓰면 된다.

### 속성(Property)

- Set과 Get 형식의 함수를 일반화한 형태

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


class 여친
{
    public int 나이 = 25;
    private int 몸무게 = 70;

    public int 속성
    {
        get
        {
            return 몸무게;
        }

        set
        {
            몸무게 = value; // set 접근자가 갖는 디폴트 매개변수
        }
    }
}


namespace @private
{
    internal class Program
    {
        static void Main(string[] args)
        {
            여친 none = new 여친();

            none.속성 = 100; // 자동으로 set
            int a = none.속성; //자동으로 get

            Console.WriteLine("나이 : " + none.나이);
            Console.WriteLine("몸무게 : " + a);
        }
    }
}

```

# 결론

> 위와 같이 속성을 가져다 쓰면 편하게 구현 할 수 있다.
