import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await response.json();

        if (data.meals) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found");
        }
      } catch {
        setError("Error loading recipe");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p style={{ padding: '20px' }}>Loading...</p>;
  if (error) return <p style={{ padding: '20px', color: 'red' }}>{error}</p>;
  if (!recipe) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) ingredients.push(`${ingredient} - ${measure}`);
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#1a202c',
        }}
      >
        {recipe.strMeal}
      </h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{
          width: '100%',
          borderRadius: '16px',
          marginBottom: '30px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      />

      <h2
        style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          marginBottom: '10px',
          color: '#2d3748',
        }}
      >
        Ingredients:
      </h2>
      <ul
        style={{
          paddingLeft: '20px',
          lineHeight: '1.8',
          marginBottom: '30px',
        }}
      >
        {ingredients.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>

      <h2
        style={{
          fontSize: '1.8rem',
          fontWeight: '600',
          marginBottom: '10px',
          color: '#2d3748',
        }}
      >
        Instructions:
      </h2>
      <p
        style={{
          fontSize: '1.1rem',
          lineHeight: '1.8',
          whiteSpace: 'pre-line',
          color: '#4a5568',
        }}
      >
        {recipe.strInstructions}
      </p>
    </div>
  );
}

export default RecipeDetail;
