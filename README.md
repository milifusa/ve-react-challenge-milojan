### React Test

The objective of this challenge is to build a small application that fetches data from the Rick and Morty API using React Bootstrap. The code provided consists of two components: **`App.tsx`** and **`Character.tsx`**.

In **`App.tsx`**, you need to implement the following features:

1. Load the characters from the Rick and Morty API.
   - You can use the **`fetch`** function to request the data from the API endpoint: **`https://rickandmortyapi.com/api/character`**.
   - Toggle the loading flag before and after fetching the data.
2. Show a loading message when the app is fetching the data.
3. Implement the next page and previous page behavior for pagination.
   - The "Next Page" button should be disabled if there is no next page.
   - The "Prev Page" button should be disabled if there is no previous page.
   - You can use the same function or hook that loads the initial data to load the next or previous data.
4. Generate a **`Character`** component for each character with real data.

In **`Character.tsx`**, you need to:

1. Replace the hardcoded character data with real data fetched from the API.
2. Fill in the character information with the real data, such as name, species, gender, and status.
3. Implement a badge that shows the character's status:

   - The badge should have the variant "danger" if the status is "Dead".
   - The badge should have the variant "dark" if the status is unknown.
   - The badge should have the variant "success" if the status is "Alive".

- You must use React and React Bootstrap to build the application.
- You must use Typescript and all the code needs to be type-safe, avoid using :any
- Ensure that the application fetches data from the correct API endpoint and handles loading and pagination correctly.
