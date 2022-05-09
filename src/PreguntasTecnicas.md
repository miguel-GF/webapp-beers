// Note: Agregue líbreria extra 'axios' para hacer peticiones al api y 'v-mask' para agregar mascaras a los input de vuetify, en este caso lo utilicé para los filtros de la fecha, ya que es más cómodo teclearla que elegirla de un calendario y también utilice router para cambiar de vista.

// Note: Con la estructura del proyecto creo es una estructura básica como se maneja normalmente, lo que podría paracerle distinto es la carpeta de services, en esa sirve para abstraer las peticiones al api por módulos, para este caso tal vez no es tan útil porque no hay mas que cervezas y un solo listado. Desde aca podemos llamar services de distintos módulos (empresas, clientes, ventas, etc) y el service de utilerias, para sacar todos los métodos que puedan ser reutilizables y llamarlas desde distintas vistas.


## Preguntas técnicas
- ¿Has aplicado los principios SOLID?
```sh
- Si, no aplique todos los principios pero apliqué:
* Single responsibility principle 
# En parte lo aplique yaque  no me dio tiempo de pasar la lógica de hacer la petición del listado de cervezas (Beers) a su componente que lo debería hacer (BeersList) y pasar lo que tuviera que ver con los filtros a un nuevo componente.
* Interface segregation principle
 # Ya que entre componentes no pase propiedades o agregar métodos que no utilizaran.
```
- ¿Cuánto tiempo has estado pensando y escribiendo tests del código? Si
hubieras tenido mucho más tiempo... ¿qué habrías añadido? Si no has
realizado tests, ¿qué herramientas habrías utilizado para llevarlos a cabo?
```sh
- Pensando en la solución para el sistema podría decirte no más de 2 horas
- Con mas tiempo, le hubierado dado mas diseño en general, separado los filtros de las cervezas en otro componente, también agregar validaciones para que no introduzcan fechas incorrectas como 24/2055 (MM/YYYY).
- Como tal no realice test del código pero hubiera utilizado JEST.
```
- ¿Cómo mejorarías la API que has usado?
```sh
Se me ocurre que aceptará los parametros con datos vacíos para que no ocurriera el error 400 y si se quiere que sea más seguro por alguna razón enviar algún dato como un Apikey, token,etc.
```
- ¿Crees que esta API soporta peticiones CORS? ¿Cómo has llegado a esa
conclusión?
```sh
Si creo que soporta peticiones CORS ya que tiene que recibir peticiones de distintos dominios, lugares.
```
- ¿Cómo rastrearías un problema de rendimiento en producción? ¿Alguna
vez has tenido que hacerlo?
```sh
Si he tenido que rastrear problemas de rendimiento, para ello a veces puede ser el query hay que analizarlo y ver si se puede optimizar esto es por parte del backend, de igual manera puedes contar el tiempo con los logs que pongas en los lugares donde podría afectar el rendimiento.
Respecto al frontend en mi caso abro las herramientas del network del navegador y veo las peticiones que se están realizando, te puedes dar cuenta si hay peticiones de más/dublicadas o el tiempo en recibir la respuesta esta tardando, de igual manera si abres la consola a veces puedes encontrar errores. También cuando son módulos pesados o con mucha información, hay que agregar gran cantidad de información y ver como se comporta el front para optimizarlo si es necesario.
```
- Descríbete a ti mismo en formato JSON.
```sh
{"name":"Miguel González Flores","age":"32 years","Description":"I am a person who does not give up easily to come up with a solution.","hobbies":"play basketball, watch movies","favorite_food":"pizza, memelas","pets":[{"name":"Gyda","age":"2 years"},{"name":"Freydis","age":"5 months"}]}
```