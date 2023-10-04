function factorial(n) {
    if (n == 0 || n == 1) {
        return 1
    } else {
        let sum = n
        for (let i = 2; i < n; i++) {
            sum = i * sum

        }
        return sum
    }
}
console.log(factorial(7))

//2 [1,2,3,4,5,6] =>{20,15}