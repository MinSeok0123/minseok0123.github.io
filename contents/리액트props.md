---
date: '2023-04-11'
title: '리액트 props'
categories: ['Web', 'Backend', 'Hacking', 'Algorithm']
summary: '리액트 props 사용방법을 알아보자.'
thumbnail: './react.png'
---

![./react.png](./react.png)

# 1. 리액트 프로퍼티 (props)를 사용하는 이유

리액트는 UI 라이브러리로서, 컴포넌트를 사용하여 UI를 구성한다. 이 때, 컴포넌트 간의 데이터 전달을 위해 프로퍼티(Props)를 사용해야한다.

# 2. 프로퍼티의 특징은 무엇인가?

프로퍼티는 부모 컴포넌트에서 자식 컴포넌트로 전달되는 데이터라서. 이 데이터는 자식 컴포넌트에서 읽기 전용으로 사용된다. 즉, 자식 컴포넌트에서는 해당 데이터를 직접 수정할 수 없다.

# 3. 프로퍼티 전달방법

프로퍼티는 부모 컴포넌트에서 자식 컴포넌트로 전달될 때 객체 형태로 전달된다. 자식 컴포넌트에서는 이 객체를 받아서 사용할 수 있다. 프로퍼티는 함수형 컴포넌트에서는 함수의 매개변수로, 클래스형 컴포넌트에서는 this.props로 접근할 수 있다.

> 아래는 프로퍼티를 이용하여 부모 컴포넌트에서 자식 컴포넌트로 이름과 나이를 전달하는 코드이다.

_부모 컴포넌트_

```
import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  return (
    <div>
      <ChildComponent name="John" age={30} />
    </div>
  );
}

export default ParentComponent;

```

_자식 컴포넌트_

```
import React from 'react';

function ChildComponent(props) {
  const { name, age } = props;
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

export default ChildComponent;

```

# 4. 자식 컴포넌트에서 부모 컴포넌트의 상태 변경을 위한 콜백 함수 전달 방법

프로퍼티를 사용하여 자식 컴포넌트에서 부모 컴포넌트의 상태를 변경하고 싶다면, 콜백 함수를 프로퍼티로 전달하여 사용할 수 있다. 이 콜백 함수는 자식 컴포넌트에서 실행되어 부모 컴포넌트의 상태를 변경할 수 있다.

> 부모 컴포넌트에서 자식 컴포넌트에서 실행될 콜백 함수를 만들어 전달하는 코드이다.

_부모 컴포넌트_

```
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const [name, setName] = useState('John');

  const handleNameChange = (newName) => {
    setName(newName);
  };

  return (
    <div>
      <p>Name: {name}</p>
      <ChildComponent onNameChange={handleNameChange} />
    </div>
  );
}

export default ParentComponent;

```

_자식 컴포넌트_

```
import React, { useState } from 'react';

function ChildComponent(props) {
  const [inputName, setInputName] = useState('');

  const handleInputChange = (event) => {
    setInputName(event.target.value);
  };

  const handleButtonClick = () => {
    props.onNameChange(inputName);
    setInputName('');
  };

  return (
    <div>
      <input type="text" value={inputName} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>Change Name</button>
    </div>
  );
}

export default ChildComponent;

```

# 5. 프로퍼티를 사용한 컴포넌트 간 데이터 전달의 장점은 무엇인가?

프로퍼티를 사용하면 데이터를 쉽게 공유하고 재사용할 수 있어 코드의 재사용성이 높아지며, 단방향 데이터 흐름으로 인해 데이터 추적이 쉬워지고 디버깅이 쉬워지며, 컴포넌트 간의 의존성이 낮아져 코드 수정이나 유지 보수가 쉬워지며, 가상 DOM을 사용하여 성능을 개선할 수 있다.
