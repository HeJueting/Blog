### instanceof 的原理，并用代码实现

> **proto**的不断指向形成的原型链，遍历链表即可

```javascript
const instanceOf = (A, B) => {
    let p = A;
    while (p) {
        if (p === B.prototype) {
            return true;
        }
        p = A.__proto;
    }
    return false;
};
```

</br>
</br>
