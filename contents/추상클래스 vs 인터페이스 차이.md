---
date: '2023-11-09'
title: '추상클래스 vs 인터페이스 차이'
categories: ['C샵']
summary: 'C 같은 절차지향 언어 : 클래스x (함수 혼자 놈)
JAVA, C# 같은 객체지향 언어 : 클래스 안에 함수'
thumbnail: './image/ClassAndInterface.png'
---

# 추상클래스 vs 인터페이스 차이

> C 같은 절차지향 언어 : 클래스x (함수 혼자 놈)
> JAVA, C# 같은 객체지향 언어 : 클래스 안에 함수

## 추상 함수 (추상 메소드)

- 클래스에 속한 함수가 구현이 되어있지 않을 경우
- 즉, 머리만 있고 몸통은 없으므로 이를 상속받는 자식 클래스는
  반드시 오버라이딩해서 기능을 추가해서 써야 한다.
- 만약 오버라이딩을 하지 않을 경우, 에러가 발생하므로
  반드시 그 함수를 구현하도록 강제한다.

### 추상 클래스 (Abstract Class)

구현이 안 되어 있고 선언만 한 추상 함수(추상 메소드)를 1개라도 포함하고 있어야 한다.
참고로 메소드라는 단어는 '클래스 안에 포함된 함수'를 뜻하는 말인데,
함수든 메소드든 거의 같은 뜻으로 쓰인다.

추상 함수를 대체 왜 쓰는 걸까? -> 설계 (구현 안하면 에러뜨게 해서 강제로 구현하게 한다)

```csharp
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


abstract class 직업
{
    // 고쳐서 써야 하는 일반함수 -> 추상함수로 수정
    public abstract void 공격스킬();

    // 고쳐서 써야 하는 일반함수 : 일반함수로 선언시, 개발자가 깜빡하고 구현 안할 수도 있다.
    public abstract void 방어스킬();


    // 일반변수
    int hp = 100;
    int mp = 100;

    // 일반함수
    public void 공통스킬()
    {

    }

    public void 공통능력치()
    {

    }
}

class 마법사 : 직업
{
    // new public void 공격스킬() new : 일반함수를 오버라이딩
    // 추상함수를 오버라이딩 :
    public override void 공격스킬()
    {
        Console.WriteLine("자식이 부모꺼 오버라이딩해서 고쳐 씀");
    }

    public override void 방어스킬()
    {
        Console.WriteLine("자식이 부모꺼 오버라이딩해서 고쳐 씀");
    }
}

class AbstractTestMain
{
    public static void Main(string[] args)
    {
        마법사 wizard = new 마법사();
        //wizard.공통능력치();
        //wizard.공통스킬();
        wizard.방어스킬();
        wizard.공격스킬();
    }
}
```

---

## [추상클래스의 문제점] : 다중 상속을 할 수 없다.

**[C#이 다중 상속을 금지하는 이유]**

> 만약 아버지A 클래스에 [say]라는 함수가 있고,
> 만약 아버지B 클래스에 [say]라는 똑같은 이름의 함수가 있을 때,
> 아들 객체가 두개 다 상속받으면 같은 이름의 함수가 2개가 들어오는 문제가 발생한다.

만약 이런 상황에서 아들 객체가 say()를 호출하면
아버지A의 say()를 호출해야 할지, 아니면
아버지B의 say()를 호출해야 할지 모호해진다.

```csharp
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


abstract class 아버지A
{
    public abstract void Say();

}

abstract class 아버지B
{
    abstract public void Say();
}

class 아들 : 아버지A//, 아버지B
{
    public override void Say()
    {
        Console.WriteLine("돌 굴러가유~");
    }
}


class 메인
{
    public static void Main(string[] args)
    {
        아들 son = new 아들();
        son.Say(); // 모호한 상황
    }
}
```

---

## 인터페이스

> 그래서 다중상속을 받을 수 있도록 하기 위해 탄생한 것이 인터페이스이다.
> 인터페이스는 추상클래스와는 달리, 절대로 일반변수와 일반함수를 선언할 수 없다.

즉 모든 함수가 **"텅 빈"** 빈 껍데기 추상함수로만 구성되어 있다.
따라서 중복이 되더라도 프로그램이 충돌하지 않는다.
(아무런 구현이 되어 있지 않으므로)

```csharp
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


// 인터페이스 여러개
interface 마법사_파이어볼
{
    // 인터페이스 : 어차피 추상함수들 밖에 없으므로 abstract 키워드를 굳이 안붙여도 된다.
    void FireBall();
}

interface 마법사의무기
{
    // 추상함수들
    void 몽둥이찜질();
    void 마나(); // 실수로 이름이 같은 함수를 또 넣었네
}

interface 마법사의대사
{
    void Magic();
    void 마나(); // 실수로 이름이 같은 함수를 또 넣었네 (근데 어차피 구현안된 빈 껍데기라서 충돌되지 않음)
}

class 마법사 : 마법사_파이어볼, 마법사의대사, 마법사의무기
{
    // 인터페이스 오버라이딩

    public void FireBall()
    {
        Console.WriteLine("파이어 볼");
    }
    public void 몽둥이찜질()
    {
        Console.WriteLine("몽둥이로 팬다");
    }
    public void 마나() // 인터페이스 안에 있는 마나 추상함수는 중복이 되도 문제 X
    {
        Console.WriteLine("마나가 없어");
    }
    public void Magic()
    {
        Console.WriteLine("매직");
    }

}


class 메인
{
    public static void Main(string[] args)
    {
        마법사 Wizard = new 마법사();
        Wizard.몽둥이찜질();
        Wizard.FireBall();
        Wizard.마나();
        Wizard.Magic();
    }
}
```

---
