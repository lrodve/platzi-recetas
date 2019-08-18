import React from 'react';
import { Helmet } from 'react-helmet'
import mealdb from '../mealdb-api'
import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'
import Loader from '../components/Loader'

export default class Recipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = { recipe: null, isLoading: true }
  }

  async componentDidMount() {
    var recipe = null
    try {
      recipe = await mealdb.getRecipe(this.props.match.params.recipeId)
    } catch(e) {
      recipe = null
    }
    this.setState({ recipe, isLoading: false })
  }

  compartir = (e) => {

    const { recipe } = this.state

    e.preventDefault()
    if(!navigator.share) {
      alert("Tu browser no soporta Web Share API")
      return
    }
    navigator.share({
      title: `${recipe.name}`,
      text : 'Receta de Platzi',
      url: document.location.href 
    })
      .then(()=> alert('Contenido compartido!'))
      .catch(error => alert('Hubo un error') )
  }

  render() {
    const { recipe, isLoading } = this.state

    if( isLoading ) {
      return <Loader/>
    }
    else if( recipe === null ) {
      return <div className="message">Hubo un problema :(</div>
    }

    return <div className="Recipe">
      <Helmet>
        <title>{ recipe.name }</title>
      </Helmet>

      <div className="hero" style={{ backgroundImage: `url(${recipe.thumbnail})` }} />
      
      <div className="title">
        <div className="info">
          <h1>{ recipe.name }</h1>
          <p>{ recipe.origin }</p>
        </div>
        <div>
          <button className="btn-share" href="#" onClick={(e) => this.compartir(e)}>Compartir</button>
        </div>
      </div>


      <RecipeIngredients ingredients={ recipe.ingredients } />

      <RecipeInstructions instructions={ recipe.instructions } />

    </div>
  }

}