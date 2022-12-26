let names = ["veli", "zeynep", "ali", "zehra", "fatma", "ayşe", "şima", "şule", "mustafa"];// array

names.sort(function(n1,n2){
    return n1.localeCompare(n2,"tr")
});
names.sort(function(n1,n2){
    return n2.localeCompare(n1,"tr")
});
console.log(names);

console.log("şima".localeCompare("seda"))