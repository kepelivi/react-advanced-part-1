export default function Layout(props) {
  const setPage = props.setPage;

  return (
    <div>
      <div className="navbar">
        {/* TODO 3: render main page */}
        <button>Main page</button>
        
        {/* TODO 4: render language-creator page */}
        <button>Add programming language</button>
        
        {/* TODO 5: render about page */}
        <button>About</button>
        
        {/* TODO 6: render demo page */}
        <button>Demo</button>
      </div>
    </div>
  );
}
