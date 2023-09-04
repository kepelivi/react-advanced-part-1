import { useState, useEffect } from 'react';
import Feedback from '../components/Feedback';


export default function LanguageDetails(props) {
  const langId = props.langId;

  const [languageInfo, setLanguageInfo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/v2/languages/${langId}`)
    .then(res => res.json())
    .then(languageData => setLanguageInfo(languageData))
    .catch(err => console.log(err));
  }, [langId])

  return <div className='page'>
    <div className='details'>
      {languageInfo &&
        <div>
          <h1>{languageInfo.name}</h1>
          <h2>First appeared: {languageInfo.dob}</h2>
          {
            languageInfo.logo &&
            <img src={languageInfo.logo} alt={languageInfo.name}></img>
          }
          <div>Designer: <i>{languageInfo.designer}</i></div>
          <div>Maintainer: <i>{languageInfo.maintainer}</i></div>
          <Feedback langId={langId}/>
        </div>
      }
    </div>
  </div>;
}
