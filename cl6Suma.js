
                let num = prompt("Escribe un numero mayor a 10: ");
                if (num >= 10){
                    let sucesion = [];
                    for (let i = num; i>= 0; i--){
                        sucesion.push(i)
                    }
                    alert(sucesion);
                }else{
                    alert("Error. El numero que escogio es menor a 10");
                }
