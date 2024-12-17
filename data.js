import Papa from 'papaparse';

async function convertCSVtoJSON() {
  const fileContent = await window.fs.readFile('menudatacsv.csv', { encoding: 'utf8' });
  
  const result = Papa.parse(fileContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true
  });

  // Clean and transform the data
  const cleanData = result.data.map(item => ({
    name: item.Name,
    portion: item.Portion,
    ingredients: item.Ingredients,
    nutritionalInfo: {
      calories: item.Calories,
      fats: item.Fats,
      protein: item.Protein,
      carbs: item.Carbs,
      salt: item.Salt
    },
    allergens: item.Allergens,
    additives: item.Additives
  }));

  console.log(JSON.stringify(cleanData, null, 2));
}

convertCSVtoJSON();
