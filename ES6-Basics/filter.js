let users = [
    {name: 'mario', premium: true},
    {name: 'yoshi', premium: true},
    {name: 'toad', premium: false},
    {name: 'bowser', premium: false},
]

users = users.filter( (item) => {
    return !item.premium
})

console.log(users);
