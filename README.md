# TeleSport

## Description
TeleSport is an interactive web application that allows users to visualize Olympic Games statistics, including the number of medals per country, the number of participations, and other relevant data.

## Features
- Display Olympic Games statistics by country.
- Visualize data in chart form.
- Navigate to detail pages for each country.
- Handle errors and redirect to a 404 page for missing data.

## Project Architecture
- **components**: Contains all reusable components.
- **pages**: Contains components pages used for routing.
- **core**: Contains business logic (services and models).

## Services
**OlympicService**: This service manages Olympic Games data, including the initial data load, and provides various methods to obtain specific statistics.

## Models
- **Olympic**: Represents a country and its participations in the Olympic Games.
- **Participation**: Represents a country's participation in an edition of the Olympic Games.


## Requirements
To set up and run this project, you need:
- **Node.js** (version >=18.x) - [Download from Node.js](https://nodejs.org)
- **npm** (comes with Node.js)
- **Angular CLI** (version 18.0.3 or later)

## Installation

1. Install Node.js
  - Download and install Node.js from [https://nodejs.org](https://nodejs.org).
  - Verify the installation:
    ```bash
    node -v
    npm -v
    ```

2. Install Angular CLI
  - To test this project, install Angular CLI:
    ```bash
    npm install -g @angular/cli@18
    ```
  - Verify the installation:
    ```bash
    ng version
    ```

3. Clone the repository
   ```bash
   git clone https://github.com/maximedrouault/TeleSport.git
   ```

4. Navigate to the project directory
   ```bash
   cd TeleSport
   ```

5. Install project dependencies
   ```bash
   npm install
   ```

6. Start to run the project with development server
   ```bash
   ng serve
   ```

## Access the application

To access the application, open your browser and go to the following address after starting the development server: [http://localhost:4200](http://localhost:4200)

