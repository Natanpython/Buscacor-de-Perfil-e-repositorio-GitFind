
import {useState} from 'react';

import { Header } from "../../Components/Header";
import background from '../../assets/background.png'

import ItemList from '../../Components/ItemList'
 
import './style.css'
import './responsiv.css'


function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.name){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});
    }

    const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
    const newRepos = await reposData.json();

    if(newRepos.length){
      setRepos(newRepos);
    }

  };




  return (
    <>
    <Header />
    <div className="conteudo">
      <img src={background} className="background" alt="backgound app"/>
      <div className="info">
        <div className="pesquisa">

          <input name="Usuario" value={user} 
          onChange={event => setUser(event.target.value)} 
          placeholder="@userName"/>

          <button onClick={handleGetData}>Buscar</button>

        </div>
        {currentUser?.name ? (<>
          <div className="infoPerfil">
          <img src={currentUser.avatar_url} className="profile"/>
          <div>
            <h3>{currentUser.name}</h3>
            <p>@{currentUser.login}</p>
            <p> {currentUser.bio}</p>
          </div>
        </div>
        <hr/>
      </>
        ) : null}
        
        {repos?.length ? (<>
        <div>
          <h4 className="tituloReposi">Repositórios</h4>
          {repos.map(repo =>(
          <ItemList title={repo.name} description={repo.description}/>
          ))}
           
        </div>
          
        </>) : null}
         

      </div>
      
    </div>
    </>
  );
}

export default App;

