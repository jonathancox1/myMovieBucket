const inventors = [
    { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
    { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
    { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
    { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
    { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
    { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
    { first: "Max", last: "Planck", year: 1858, passed: 1947 },
    { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
    { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
    { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
    { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
    { first: "Hanna", last: "HammarstrÃ¶m", year: 1829, passed: 1909 }
];



//filter array for those born in 1500
const newInventors = inventors.filter(index => index.year >= 1500 && index.year < 1600);
console.log(newInventors);


//array of inventors first and last name
const names = inventors.map(index => index.first + ' ' + index.last);
console.log(names);


//total amount of years each inventor lived 
const total = inventors.map(function (index) {
    return {
        first: index.first,
        last: index.last,
        age: (index.passed - index.year)
    }
    // return index.first + ' ' + index.last + ', ' + (index.passed - index.year);
})
console.log(total);


//sum all ages
const sum = total.reduce(function (acc, curVal) {
    acc = total.age;
    return acc + curVal;
}, 0);
console.log(sum);

// sum
const sums = inventors.reduce(function (acc, curVal) {
    let age = (curVal.passed - curVal.year);
    return acc + age;
}, 0);
console.log(sums);
