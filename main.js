//tiene que ser un arreglo de objetos lo que se le pase, no funciona si es solo un objeto

const jsonform = document.querySelector("#jsonform");
const csvform = document.querySelector("#csvform");
const bConvert = document.querySelector("#bConvert");

bConvert.addEventListener("click", e =>{
    convertJSONtoCSV();
});

function convertJSONtoCSV(){
    let json;
    let keys = [];
    let values = [];

    try {
        json = JSON.parse(jsonform.value)
    } catch (error) {
        console.log("Formato JSON incorrecto", error);
        alert("Formato JSON incorrecto");
        return;
    }

    if (Array.isArray(json)) {
        //algoritmo
        json.forEach(item =>{
            //se supone que el arreglo es de objetos por lo que puedo usar
            const nKeys = Object.keys(item);

            if (keys.length == 0) {
                keys = [...nKeys];
            }else{
                if (nKeys.length != keys.length) {
                    //si se cumple quiere decir que las propiedades no son iguales en cada uno de los objetos
                    throw new Error("Number of keys are different");
                    //no validamos en este caso que si son la misma cantidad de keys, que sean las mismas 
                }else{
                    console.log("OK", nKeys);
                }
            }

            const row = keys.map(k =>{
                return item[k];
            });
            
            values.push([...row]);
        });

        console.log(keys, values);
        values.unshift(keys);//las claves las agrego antes de todo, antes de los valores
        //el map une los valores en la fila por coma y cada fila por un salto de linea
        const text = values.map((v) => v.join(",")).join("\n");
        csvform.value=text;
    }else{
        alert("No es un arreglo de objetos");
    }
}

/* el JSON de ejemplo
[
    {
        "id": 0,
        "nombre":"Marcos",
        "edad" : 29
    },
    {
        "id": 1,
        "nombre":"Lenis",
        "edad" : 29
    }
]
*/