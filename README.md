# Mini Product Insights Dashboard

Este proyecto detalla la implementación de un **Mini Product
Insights Dashboard** construido con **Next.js y TypeScript**.\
El objetivo es proporcionar una vista rápida del estado general de un
catálogo de productos y permitir explorar el detalle de cada uno.

Los datos se obtienen desde la API pública **DummyJSON**, y se procesan
a través de una capa backend interna antes de ser utilizados en el
frontend.

El foco principal de esta implementación fue construir una solución
sencilla, que mantuviera una estructura modular y sea fácil de mantener, mostrando la información de la forma más sencilla y entendible posible.

------------------------------------------------------------------------

# Estructura del Proyecto

    products-app-challenge
    │
    ├─ app
    │  ├─ api/products
    │  │  └─ route.ts
    │  │
    │  ├─ products
    │  │  ├─ page.tsx
    │  │  └─ [id]
    │  │     └─ page.tsx
    │  │
    │  ├─ layout.tsx
    │  ├─ page.tsx
    │  └─ globals.css
    │
    ├─ components
    │  ├─ CategoryChart.tsx
    │  ├─ Footer.tsx
    │  ├─ Header.tsx
    │  ├─ InsightsCards.tsx
    │  ├─ ProductTable.tsx
    │  └─ Sidebar.tsx
    │
    ├─ lib
    │  └─ constants.ts
    │
    ├─ types
    │  └─ product.ts
    └── README.md

## Descripción de carpetas

### `app/`

Contiene las rutas principales de la aplicación usando **Next.js App
Router**.

### `app/api/`

Define endpoints backend que procesan datos antes de enviarlos al
frontend.

### `components/`

Componentes reutilizables de interfaz.

### `lib/`

Constantes y utilidades compartidas.

### `types/`

Definiciones de tipos TypeScript para mantener consistencia en la
estructura de datos.

------------------------------------------------------------------------

# Cómo ejecutar el proyecto

## 1. Instalar dependencias

``` bash
npm install
```

## 2. Ejecutar el servidor de desarrollo

``` bash
npm run dev
```

## 3. Abrir la aplicación

La aplicación estará disponible en:

http://localhost:3000

Desde la interfaz es posible navegar entre:

-   **Dashboard principal (`/`)**
-   **Lista de productos (`/products`)**
-   **Detalle de producto (`/products/[id]`)**

------------------------------------------------------------------------

# Rutas de la Aplicación

  Ruta               Descripción
  ------------------ -----------------------------------------------
  `/`                Dashboard principal con métricas del catálogo
  `/products`        Lista completa de productos
  `/products/[id]`   Vista de detalle de producto
  `/api/products`    Endpoint backend que agrega datos

------------------------------------------------------------------------

# Decisiones de Producto

Al diseñar el dashboard intenté priorizar la información que un
stakeholder normalmente necesitaría ver primero al revisar un catálogo.

La interfaz se organiza en tres niveles de información.

## 1. Métricas generales del catálogo

El dashboard principal muestra primero métricas agregadas como:

-   total de productos
-   precio promedio
-   stock total
-   producto mejor evaluado
-   distribución por categoría

Estas métricas permiten entender rápidamente el estado general del
catálogo sin tener que revisar productos individualmente.

## 2. Distribución del catálogo

Se incluye un gráfico de distribución por categoría para visualizar
rápidamente cómo se compone el catálogo.

Esto puede ayudar a identificar:

-   concentración de productos en ciertas categorías
-   posibles desequilibrios en el catálogo

## 3. Exploración de productos

Luego se presenta la lista completa de productos, desde donde es posible
navegar al detalle de cada uno.

La intención es permitir que el usuario pase de una:

vista agregada → exploración → detalle

de forma natural.

------------------------------------------------------------------------

# Decisiones Técnicas

## Next.js con App Router

Se utilizó **Next.js con App Router**, lo que permite manejar tanto el
frontend como los endpoints backend dentro del mismo proyecto.

Esto simplifica la arquitectura para este tipo de aplicación porque
evita tener que mantener un backend separado.

Además permite aprovechar:

-   Server Components
-   rutas API integradas
-   rendering del lado del servidor
-   routing basado en carpetas

## Capa backend de agregación (`/api/products`)

En lugar de consumir directamente la API de DummyJSON desde el frontend,
se implementó una ruta backend interna:

/api/products

Esta capa cumple dos objetivos:

1.  **Centralizar el acceso a la API externa**
2.  **Procesar los datos antes de enviarlos al frontend**

Dentro de esta ruta se calculan métricas como:

-   precio promedio
-   stock total
-   categoría más frecuente
-   producto con mejor rating

De esta forma el frontend recibe datos listos para el dashboard en lugar
de tener que calcularlos en el cliente.

Esto también facilita cambiar la fuente de datos en el futuro sin
modificar el frontend.

## Server Components para obtener datos

El dashboard principal utiliza **Server Components** para obtener los
datos desde `/api/products`.

Esto permite:

-   mantener la lógica de datos en el servidor
-   simplificar el código del cliente
-   evitar múltiples requests desde el navegador

Además se deshabilitó el caching (`no-store`) para asegurar que siempre
se obtengan datos actualizados.

## Sistema de estilos

Se utilizó **Tailwind CSS** para construir la interfaz.

Las razones principales fueron:

-   rapidez de desarrollo
-   consistencia visual
-   menor necesidad de CSS personalizado

Esto permitió enfocarse más en la funcionalidad del dashboard que en la
configuración de estilos.

## Visualización de datos

Para el gráfico de distribución por categoría se utilizó **VisActor**.

Se eligió porque permite definir visualizaciones declarativas mediante
un objeto de configuración, lo que facilita integrar gráficos sin tener
que construir componentes complejos desde cero.

## Sistema de temas

El dashboard incluye soporte para **modo oscuro**, implementado
mediante:

next-themes

Esto permite que los componentes adapten automáticamente sus estilos
utilizando las variantes `dark:` de Tailwind.

------------------------------------------------------------------------

# Dependencias principales

-   Next.js
-   React
-   TypeScript
-   TailwindCSS
-   VisActor
-   next-themes

------------------------------------------------------------------------

# Tipos TypeScript

Los tipos principales del proyecto están definidos en:

types/product.ts

Ejemplo:

``` ts
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
};
```

Esto ayuda a mantener consistencia en el manejo de datos entre frontend
y backend.

------------------------------------------------------------------------

# Limitaciones actuales

## Dependencia de API externa

La aplicación depende de la disponibilidad de DummyJSON.\
Si la API no responde, el dashboard no podrá mostrar datos.

## Sin autenticación

No se implementó autenticación ni control de acceso.\
El proyecto está pensado como dashboard interno o demo.

## Cálculos realizados en cada request

Las métricas agregadas se calculan en cada request al endpoint
`/api/products`.

Esto funciona bien para datasets pequeños, pero en un escenario real
probablemente se debería:

-   cachear resultados
-   usar una base de datos intermedia
-   o calcular agregaciones de forma periódica

## Dataset limitado

DummyJSON contiene un número reducido de productos, por lo que el
dashboard no refleja desafíos reales de escalabilidad.

------------------------------------------------------------------------

# Mejoras futuras

Con más tiempo consideraría implementar:

-   búsqueda de productos
-   filtros por categoría o precio
-   paginación
-   caching de resultados
-   tests unitarios
-   logging estructurado
-   observabilidad básica
-   aspecto general dashboard

------------------------------------------------------------------------

# Comandos útiles

Instalar dependencias

``` bash
npm install
```

Ejecutar en modo desarrollo

``` bash
npm run dev
```

Build de producción

``` bash
npm run build
```

Ejecutar build de producción

``` bash
npm start
```
