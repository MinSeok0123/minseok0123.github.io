---
date: '2023-10-26'
title: 'C# Class와 Struct차이'
categories: ['C샵']
summary: '기존 C 언어에서는 Class 구분이 없이 Struct를 사용해서 기존 C와 호환성을 위해 Struct를 사용한다.'
thumbnail: './StructvsClass.png'
---

# Class와 Struct차이

### 사용하는 이유!

> _기존 C 언어에서는 Class 구분이 없이 Struct를 사용해서 기존 C와 호환성을 위해 Struct를 사용한다._

## - Struct

1. Struct는 상속받을 수 없다.
2. Struct는 값 타입(ValueType)이다. 그래서 new 키워드로 메모리를 할당 할 필요가 없다.
3. 값 타임의 경우 스텍이라는 메모리 영역에 할당 된다.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyC
{

    struct 할아버지
    {
        public void 할아버지재산()
        {
            Console.WriteLine("[1] 할아버지 재산");
        }
    }

    struct 아버지
    {
        public void 아버지재산()
        {
            Console.WriteLine("[2] 아버지 재산");
        }
    }

    struct 아들
    {
        public void 아들재산()
        {
            Console.WriteLine("[3] 아들 재산");
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            할아버지 grandFather; //값 타입이라서 new 키워드를 사용하지 않고 사용가능;
            grandFather.할아버지재산();

            아버지 Father; //값 타입이라서 new 키워드를 사용하지 않고 사용가능;
            Father.아버지재산();

            아들 son; //값 타입이라서 new 키워드를 사용하지 않고 사용가능;
            son.아들재산();
        }
    }

}
```

---

## - Class

1. Class는 상속받을 수 있다.
2. Class는 참조(Reference Type)이다. 그래서 new 키워드를 사용해 메모리 할당이 필요하다.
3. 참조 타입은 힙에 할당하는 값의 주소를 가지고 있다.

```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudyC
{

    class 할아버지
    {
        public void 할아버지재산()
        {
            Console.WriteLine("[1] 할아버지 재산");
        }
    }

    class 아버지 : 할아버지 //아버지는 할아버지의 재산을 상속받았다.
    {
        public void 아버지재산()
        {
            Console.WriteLine("[2] 아버지 재산");
        }
    }

    class 아들 : 아버지 //아들은 아버지의 재산을 상속받았다 => (아버지는 할아버지의 재산을 상속받았기 때문에 아들을 아버지, 할아버지 둘다 재산을 상속받는다)
    {
        public void 아들재산()
        {
            Console.WriteLine("[3] 아들 재산");
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            할아버지 GrandFather = new 할아버지(); //new 키워드를 이용해 메모리에 할당함;
            GrandFather.할아버지재산();

            아버지 Father = new 아버지(); //new 키워드를 이용해 메모리에 할당함;
            Father.아버지재산();
            Father.할아버지재산() ; //할아버지 재산을 상속받아서 할아버지재산에 접근할 수 있다.

            아들 son = new 아들(); //new 키워드를 이용해 메모리에 할당함;
            son.아들재산();
            son.아버지재산(); //아버지 재산을 상속받아서 아버지재산에 접근할 수 있다.
            son.할아버지재산(); //아버지 재산에 할아버지 재산이 포함되어 있기 때문에 할아버지 재산에도 접근이 가능하다.
        }
    }

}
```

### 상속을 하는 이유

> 만약 게임에서 캐릭터의 공통능력치가 약 5000줄 이라고 하면,
> 각 캐릭터 클래스 마다 일일히 5000줄을 다 넣어줘야 한다.
> 하지만 상속을 이용하면 공통능력치라는 클래스를 만들고
> 각 캐릭터에 상속을 시켜주면 공통능력치를 다 줄수있다.

### class에서 상속을 금지하는 방법

```csharp
    sealed class 할아버지
    {
        public void 할아버지재산()
        {
            Console.WriteLine("[1] 할아버지 재산");
        }
    }
```

class 앞에 "sealed"를 붙이면 상속이 금지된다. =>
(아버지가 상속을 받지 못하고, 아들도 할아버지의 재산을 상속받지 못한다)

---

### Struct는 언제 쓰면 좋을까?

구조체가 클래스보다 속도가 빠르다는 장점이 있다.

하지만 스텍 메모리만 사용하자니 스텍 메모리는 제한이 있어 많이 사용할 경우 스텍오버플로우가 발생할 수 있으니 적절히 균형있게 사용하는게 좋다.

## 결론

Struct와 Class의 큰 차이는 상속에 대한 처리 및 그 사용성도 있지만 타입(값, 참조)에 따른 메모리 할당 방식의 차이가 가장 크다.

하지만 아직 언제 사용하면 좋을지 감은 잘 오지 않는다. 이것에 대해서는 조금 더 공부해야겠다.
