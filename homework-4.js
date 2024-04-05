// Домашнее задание(Порешать типовые задачи - написать порядок и вывод в консоли):
// 1)
console.log('1');
setTimeout(() => console.log('2'), 1);
let promiseNew = new Promise((resolve) => {
    console.log('3');
    resolve();
});
promiseNew.then(() => console.log('4'));
setTimeout(() => console.log('5'));
console.log('6');
//console.log('1'), console.log('3'), console.log('6') являются синхроными операциями, по этому они будут выполнятся первыми друг за другом
//console.log('4') это микротаски, поэтому она будет выполнятся после синхроных операций
//console.log('5'), console.log('2') это макротаски по этому они будут выполнятся после микротасок 
//console.log('5') выполнится раньше, потому что у неё задержка меньше, чем у console.log('2')
// ответ 1,3,6,4,5,2
//////////////////////////////
// 2)
let promiseTree = new Promise((resolve, reject) => {
    resolve("a");
    console.log("1");
    setTimeout(() => {
        console.log("2");
    }, 0);
    console.log("3");
});
//console.log("1"), console.log("3") являются синхроными операциями, по этому они будут выполнятся первыми друг за другом
//console.log('2') это макротаска, поэтому она будет выполнятся после синхроных операций

//ответ 1, 3, 2
/////////////////////////
// 3)
let promiseTwo = new Promise((resolve, reject) => {
    resolve("a");
});
promiseTwo
    .then((res) => {
        return res + "b";
    })
    .then((res) => {
        return res + "с";
    })
    .finally((res) => {
        return res + "!!!!!!!";
    })
    .catch((res) => {
        return res + "d";
    })
    .then((res) => {
        console.log(res);
    });
    //у нас resolve успешное выполнения, по этому выполняем все then и пропускаем finally и catch
    //ответ abc
/////////////////////////////
// 4)
function doSmth() {
    return Promise.resolve("123");
}
doSmth()
    .then(function (a) {
        console.log("1", a); 
        return a;
    })
    .then(function (b) {
        console.log("2", b);
        return Promise.reject("321");
    })
    .catch(function (err) {
        console.log("3", err);
        
    })
    .then(function (c) {
        console.log("4", c);
        return c;
    });
    //тут мы возвращем промисы, а не цепочку промисов
    //console.log("1", a), console.log("2", b) выводит 1 123 и 2 123 потому что у нас resolve передааёт 123
    // после Promise.reject("321") у нас срабатывает catch выводит 3 321
    // после выводит console.log("4", c), но выводит только 4, это из-за catch, если мы сделали бы return то вернули 321 в console.log("4", c)
    // ответ 1 123, 2 123, 3 321, 4 undefined
///////////////////////////
// 5)
console.log("1");
setTimeout(function () {
    console.log("2");
}, 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// console.log("1"), console.log("4") являются синхроными операциями, по этому они будут выполнятся первыми друг за другом
// console.log("3") это микротаски , поэтому она будет выполнятся после синхроных операций
// console.log("2") это макротаски по этому они будут выполнятся после микротасок 
// ответ 1432
////////////////////////////
//7)
async function a() {
  console.log("a");
}

console.log("1");

(async function () {
  console.log("f1");
  await a();
  console.log("f2");
})();
console.log("2");

//console.log("1") синхроная операция, по этому она будет выполнятся первой
// console.log("f1")  выполняется вторым, потому что находится в самовызывающейся функци и вызывем функцию а и выводим console.log("a")
//потом мы выводим console.log("2"), потому что синхроная операция, а потом console.log("f2") 
//ответ 1,f1,a,2,f2
////////////////////////////////
//8)
console.log(1);

setTimeout(() => console.log(2));

async function func() {
  console.log(3);

  await new Promise((resolve) => {
    console.log(4);
    resolve();
    console.log(5);
  })
    .then(() => console.log(6))
    .then(() => console.log(7));

  console.log(8);
}

setTimeout(() => console.log(9));

func();

console.log(10);

//ответ 1 3 4 5 10 6 7 8 2 9 
///////////////////////////////////
// 9)*
function foo(callback) {
    setTimeout(function() {
      callback("A");
    }, Math.random() * 1000);
  }
  
  function bar(callback) {
    setTimeout(function() {
      callback("B");
    }, Math.random() * 500);
  }
  
  function baz(callback) {
    setTimeout(function() {
      callback("C");
    }, Math.random() * 500);
  }
  
  function promis(func) {
    return new Promise(r => func(r));
  }
  
  promis(foo)
    .then(r => console.log(r))
    .then(() => promis(bar))
    .then(r => console.log(r))
    .then(() => promis(baz))
    .then(r => console.log(r))

// Написать функцию, чтобы починить последовательность выполнения A,B,C без использования колбэк хэлла
// в функциях foo, bar,baz запрещено что-либо менять
// подсказка: нужны промисы =))