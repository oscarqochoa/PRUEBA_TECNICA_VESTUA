/**
 * On this module you should write your answer to question #1.
 * This file would be executed with the following command (N=100):
 * $ node scritp.js 100
 */

const args = process.argv.slice(-1);
console.log(`Running question #1 with args ${args}`)

process.stdout.write("Ingresa un número: ")

process.stdin.on('data', function (data) {

    const escaleras = (n) => {
        if (n < 3) return n

        const current = new Array(n)

        current[0] = 1
        current[1] = 2

        const solucion = (n) => {
            if (current[n - 1]) return current[n - 1]
            current[n - 1] = solucion(n - 1) + solucion(n - 2)
            return current[n - 1]
        }
        return solucion(n)
    }

    process.stdout.write(escaleras(data).toString())

});
