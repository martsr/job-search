DESAFIO FINAL TYPESCRIPT - Buscador de Trabajos

Se pueden buscar trabajos por nombre y/o locacion.
Comandos: - Por trabajo y locacion: npm run dev -- --search --keywords=<nombre> --location=<locacion>
Ej: npm run dev -- --search --keywords='software developer' --location=USA

    - Por nombre:  npm run dev -- --search --keywords=<nombre>
      Ej: npm run dev -- --search --keywords='Node.js'

    - Por Locacion:  npm run dev -- --search --location=<locacion>
      Ej: npm run dev -- --search --location=Brazil

Siempre que se ejecute alguno de estos ultimos 3 comandos se tendra la oportunidad de guardar trabajos en una BD, para esto se debe copiar el ID de trabajo, pegarlo en la terminal y presionar ENTER. Una vez que finalizo con el cargado simplemente se debe presionar ENTER.

Para poder ver TODOS los trabajos guardados ejecutar el siguiente comando:
npm run dev -- --searchHistory all

Para poder buscar un trabajo guardado en particular se puede optar hacerlo por el id, titulo, fuente, empresa y locacion.
Comandos: - Por ID: npm run dev -- --searchHistory --id=<id>
Ej: -9162789702905524000

        - Por titulo: npm run dev -- --searchHistory --title=<title>
          Ej: npm run dev -- --searchHistory --title=Node.js

        - Por fuente: npm run dev -- --searchHistory --source=<fuente>
          Ej: npm run dev -- --searchHistory --source=career

        - Por empresa: npm run dev -- --searchHistory --company=<empresa>
          Ej: npm run dev -- --searchHistory --company=Grup

        -Por Locacion: npm run dev -- --searchHistory --location=<locacion>
         Ej: pm run dev -- --searchHistory --location='San Diego'

A los trabajos guardados se les puede agregar un comentario, para eso se debe aclarar el ID del trabajo junto con un comentario.
Comando: npm run dev -- --addComment --id=<id> --comment=<comment>
Ej: npm run dev -- --addComment --id=-9162789702905524000 --comment='Este es un comentario'

Se pueden eliminar trabjaos guardados, par eso se debe aclarar el ID.
Comando: npm run dev -- --deleteJob --id=<id>
Ej: npm run dev -- --deleteJob --id=5634628727208660000
