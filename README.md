




















Introducción
La tienda en línea es diseñada para brindar a los compradores una experiencia intuitiva, rápida y segura. Donde las compra en línea están en constante evolución, la eficiencia, capacidad de adaptación y escalabilidad son los factores críticos para el éxito y beneficios, tendiendo en cuenta eso factores, la tienda en línea se desarrolla utilizando enfoques actuales basada en arquitectura de microservicios y un patrón de diseño modelo, vista, controlador (MVC) asegurando una estructura fácil de escalar.
El proyecto tiene como objetivo crear una plataforma escalable y flexible donde permita a los usuarios compra de una manera sencilla y a nivel interno se facilita la administración y mantenimiento del sistema en un largo plazo. Con la arquitectura de microservicios el proyecto divide las funcionalidades en componentes independientes mejorando así el modularidad, rendimiento.
Las tiendan en línea no solo requieren funcionalidades básicas como el manejo de usuarios y productos, sino que sea capas de adaptarse a las necesidades de los consumidores, teniendo en cuenta esto esta tienda en línea toma las tecnologías como Node.js para el backend, React para el Frontend y MongoDB para la base de datos NoSQL, que se complementa de manera eficiente con los microservicios, este permite que distintos componentes del sistema se desarrollen y se desplieguen de manera independiente sin afectar la plataforma.









Arquitectura 
Este proyecto esta diseñado para maximizar la escalabilidad, el mantenimiento y la capacidad de respuesta de la página, el proyecto está compuesto por dos pilares muy importantes, un patrón MVC el cual dispones y organiza un flujo interno en la aplicación entre el Backend y Frontend
	Patrón De Diseño MVC
Este sea implementado en los microservicios para contar con un código mas sencillo de escalar y mantener. En este patrón el modelo representa la estructura lógica y de datos, lo modelo maneja la comunicación con la base de datos. Los modelos cuentan con la estructura para: productos, carrito de compras, usuarios. También gestiona las operaciones CRUD, asegurando que los modelos se adapten a las necesidades de los microservicios. La vista, la cual se maneja con React esta permite que los componentes funciones de manera interactiva que responde a los datos y acciones del usuario, esta parte muestra a los usuarios los datos que provienen desde el Backend renderizando los componentes de acuerdo al estado en el que se encuentre la aplicación.
Los controladores esta para actuar como intermediarios entre los modelos y la vista, recibiendo las solicitudes de los usuarios desde la vista interactuando con el modelo para realizar la lógica y devolver los datos necesarios.





	Microservicios
es esencial en el proyecto ya que permite que la estructura sea escalable y sea distribuida, donde se divide en módulos independientes cada uno contando con su propia lógica. Estos microservicios tienen funciones específicas y se comunican entre sí mediante las APIS, en este proyecto se cuenta con los siguientes microservicios:


	Autentificación:
Gestiona los usuarios y una autentificación segura, se utiliza Tokens para la gestión de sesión lo cual permite autenticar de manera segura a los usuarios, validando el acceso de cada solicitud.
	Carrito de Compras:
Encargado de agregar los productos, modificar o eliminar cantidades de elementos que estén en el carrito, el servicio mantiene el estado del carrito en tiempo real para los usuarios.
	Productos:
Este servicio genera la creación, eliminación y actualización de los elementos de la tienda, gestiona las consultas de los productos. este permite manejar grandes cantidades de datos, optimizando las consultas.
	Usuarios:
Este microservicio gestiona los perfiles de usuario, su creación y actualización permitiendo así controlar la información relevante de los usuarios, como las compra realizadas o los interese más frecuente del usuario.











Tecnologías Utilizadas
Para desarrollar el proyecto de majaron tecnologías actuales las cuales permitan construir una plataforma eficaz y fácil de manejar, las tecnologías seleccionadas se integran con la arquitectura de microservicios las herramientas utilizadas son las siguientes.
	Node.js y Express:
Mas precisamente se seleccionaron para el Backend, donde Node.js permite manejar fácilmente operaciones de entrada y salida, tiene una gran capacidad para soporta solicitudes que son concurrentes, este permite crear microservicio de manera sencilla y eficiente. Express es un framework que facilita crear APIS junto a Node.js, express permite manejar los controladores y rutas de los microservicios proporcionando un flujo de trabajo organizado y rápido.
	React:
Enfocado al Frontend, es una biblioteca de JavaScript orientada a componentes, React proporciona facilidad para crear una interfaz de usuario dinámica, permite organizar el Frontend separando de manera clara la vista y la lógica. React Router un componente de React que facilita la navegación y los enrutamientos de proyecto 
	MongoDB:
Utilizado para manejar la base de datos del proyecto de una manera NoSQL, la cual nos permite almacenar la información en formato JSON dando una facilidad para intégrala con aplicaciones donde se maneja JavaScript. Se capacidad de escalabilidad permite añadir nodos según crecen los datos.
•	Mongoose: esta herramienta facilita la interacción de Node.js y MongoDB, facilitando así el modelado de datos en Mongo, permitiendo la manipulación de datos eficaz. 
	JWT:
Esta permite la autentificación de los usuarios mediante tokens. Cada uno de los microservicios validan el token así garantizando que los usuarios ingresen a lo que tiene permitido visualizar y evitar accesos a funciones restringidas para los usuarios normales, dando así más seguridad al proyecto.


	Bcrypt:
Es una biblioteca de Hashing diseñada para la seguridad de contraseñas, este genera hashes únicos sin importar que dos usuarios tenga la misma contraseña.
•	Hashing: Este trasforma un texto plano en valores hash, esta es una muy buena herramienta de criptografía, una gran ventaja es que los valores solo pueden ser descifrados con la clave única que se da con las funciones hash.
	Axios:
Esta tecnología se implementa con la finalidad de comunicar los microservicios, Axios envía solicitudes de manera asincrónica, gestiona los errores y las respuestas en general. Tiene bastantes beneficios para implementarlo como, el manejo de peticiones complejas, intermediario para autentificar y recibir los errores.
	Vite:
Esta herramienta de compilación ayuda para obtener un desarrollo rápido para proyectos de pagina web, la cual junto con React facilita la creación de proyectos, esta herramienta compila y recarga en tiempo real al momento de realizar modificaciones en el código
	Bootstrap:
Este framework facilita el diseño de paginas web mediante el uso de componentes como, botones, formularios y tablas. Este es un framework de código libre, el cual tiene una gran compatibilidad entre los navegadores. Este ayuda a que el diseño de la pagina sea mucho más fácil de desarrollar.
Funcionalidad del sistema
la funcionalidad del sistema en el proyecto permite que los usuarios tengan una completa y fluida experiencia, todas las funcionalidades se organizan en microservicios lo que permite manejar los componentes de manera independiente, el sistema cuenta con las siguientes funcionalidades.
	Gestión de Usuario:
	Registro de usuario nuevos: el usuario crea su cuenta proporcionado los datos como correo, nombre, contraseña. Esta información se almacena en el microservicio de usuario para posteriormente interactuar con la base de datos de MongoDB.
	Autorización y Autentificación: en el inicio de sesión, el usuario adquiere un token dado por JWT que se almacenara en el Frontend y se enviara con las solicitudes para identificar al usuario, el Backend valida este token par asegura que el usuario este autorizado.
	Gestión de Productos:
	Catalogo de productos: esto facilitara la navegación y búsqueda de los productos, todos los productos cuentan con los detalles, nombre, cantidad  y precio.
	Actualización de inventario: al realizar una venta el sistema actualizara el inventario de manera automática, este a su ve enviara una notificación a los administradores por si el producto es escaso o no está ya en inventario.
	Editar productos: es función esta habilitada solo para administradores, donde se podrá agregar quitar o actualizar los elementos de la tienda. 
	Carrito de Compras:
	Agregar Productos al carro: los usuarios podrán agregar elementos a su carrito desde el catalogo, este carrito se actualizar en tiempo real y guardara los productos, aunque el usuario cierre la sesión.
	Eliminar Productos: se podrá realizar eliminaciones de productos el cual el usuario no desee los cambios se reflejarán de manera inmediata. 
	Seguridad:
	Hashing: la tienda en línea cuenta con un cifrado, que convierte la contraseña en caracteres que solo con funciones como hash puede ser descifradas, en el momento de registro de usuario o ingreso las funciones hash se implementa para la validación de los datos para la contraseña.







Estructura del proyecto
El Backend y Frontend del proyecto cuenta con la siguiente estructura
Backend: este cuenta con los microservicios que será implementados en la página, cada microservicio tiene controladores, modelos y rutas, esenciales para su funcionamiento.









Frontend
En esta parte del proyecto se encuentra los componentes, paginas, estilos y servicios. Que se mostrara a los usuarios o sea necesarios para la interacción del cliente con la tienda en línea.








Requerimientos Y Instalación
	Node.js:
Para su instalación se descarga des de su pagina oficial https://nodejs.org/en para verificar si se instaló correctamente en un terminal ejecutamos el comando node -v, npm -v

	Express.js:
Se instala entrando en el terminal y ejecutando el comando (npm install express) después de su instalación en cada microservicio se crea una carpeta de controles (mkdir routes controllers models)
	JWT: Servicio de autentificación

           Paquete dotenv, para guardar la key en el archivo env


	Bcrypt: seguridad de contraseñas con Hashing


	MongoDB:
Desde su página oficial https://www.mongodb.com/products/platform/atlas-database  se realiza la instalación del servicio de base de datos
Instalación de Mongoose: se debe realizar en cada uno de los microservicios para la que interactúe correctamente con la base de datos.

	Deven: instalación para la gestión del entorno de desarrollo

	React.js: Se ejecuta el siguiente comando para iniciar el proyecto de React

	Axios: para la instalación de axios el cual interactuar con los microservicios usamos el siguiente comando en nuestro terminal.

Y en nuestra carpeta de servicios creamos un archivo axios.js como se muestra en la imagen 





	 Bootstrap: comandos de instalación para Bootstrap











Conclusión
El desarrollo de la tienda en línea ha sido un proceso muy emocionante y enriquecedor que ha contado con muchas tecnologías y un enfoque robusto. Con la implementación de una arquitectura de microservicios y el patrón de diseño MVC, el logro separa claramente las responsabilidades, lo que nos asegura que a medida que aumenta el número de usuarios y productos, se pueden realizar actualizaciones o nuevos módulos sin afectar la estabilidad de la página. Los microservicios tienen una función específica dentro del proyecto, gracias a la implementación de Node.js y Express, se logró una API rápida, y en el Frontend con la integración de React y Vite da a los usuarios una experiencia interactiva y dinámica.
Además, el uso de MongoDB permite un manejo flexible de datos. Convirtiendo la en una tienda en línea escalable, modular y segura es el objetivo del proyecto. Esta arquitectura no solo satisface las necesidades actuales del sistema, sino que también brinda flexibilidad para el futuro, haciéndola adaptable a medida que las necesidades de los usuarios y el mercado se expanden. La experiencia en el desarrollo de este proyecto enfatizó la importancia de un diseño bien estructurado y tecnologías cuidadosamente seleccionadas, que nos permitieron crear una plataforma estable, fácil de mantener y eficiente.








 

Referencias
axios-http.com. (s.f.). Obtenido de axios-http.com: https://axios-http.com/docs/intro
bcrypt. (s.f.). www.npmjs.com. Obtenido de www.npmjs.com: https://www.npmjs.com/package/bcrypt
es.vitejs.dev. (s.f.). Obtenido de es.vitejs.dev: https://es.vitejs.dev/guide/
expressjs.com. (s.f.). Obtenido de expressjs.com: https://expressjs.com/
getbootstrap.com. (s.f.). Obtenido de getbootstrap.com: https://getbootstrap.com/docs/5.3/getting-started/introduction/
jwt.io. (s.f.). Obtenido de jwt.io: https://jwt.io/introduction
keepcoding.io. (s.f.). Obtenido de https://keepcoding.io/fundamentos-programacion/que-es-jwt/
nodejs.org. (s.f.). Obtenido de nodejs.org: https://nodejs.org/docs/latest/api/
react.dev. (s.f.). Obtenido de react.dev: https://react.dev/learn
www.mongodb.com. (s.f.). Obtenido de www.mongodb.com: https://www.mongodb.com/docs/atlas/
www.skysnag.com. (s.f.). Obtenido de www.skysnag.com: https://www.skysnag.com/es/blog/what-is-bcrypt/


