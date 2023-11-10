function SummaryBookSkel(){

  return (
    <div className="row">

      <div className="container">
        <div className="inner__wrapper">
          <div className="inner__book">

            <div className="inner-book__title" style={{backgroundColor:'#f4f4f4', width:'706px' ,height:'76px'}}></div>
            <div className="inner-book__author" style={{backgroundColor:'#f4f4f4',width:'60px' ,height:'19px'}}>
            
            </div>
            <div className="inner-book__subtitle" style={{backgroundColor:'#f4f4f4',width:'110px' ,height:'24px'}}>
              
            </div>

            <div className="inner-book__wrapper">
              <div className="inner-book__description--wrapper" style={{backgroundColor:'#f4f4f4',width:'460px' ,height:'60px'}}>
            
              </div>
            </div>

            <div className="inner-book__read--btn-wrapper" >
              <button className="inner-book__read--btn" style={{backgroundColor:'#f4f4f4',width:'144px' ,height:'48px'}}>
                <div className="inner-book__read--icon"></div>
                <div className="inner-book__read--text"></div>
              </button>

              <button className="inner-book__read--btn" style={{backgroundColor:'#f4f4f4',width:'144px' ,height:'48px'}}>
                <div className="inner-book__read--icon"></div>
                <div className="inner-book__read--text"></div>
              </button>
            </div>

            <div className="inner-book__bookmark" style={{backgroundColor:'#f4f4f4',width:'300px' ,height:'22px'}}>
               
            </div>

            <h2 className="inner-book__secondary--title">{"What's"} it about?</h2>

            <div className="inner-book__tags--wrapper" style={{backgroundColor:'#f4f4f4',width:'300px' ,height:'48px'}}>
              
            </div>

            <div className="inner-book__book--description" style={{backgroundColor:'#f4f4f4',width:'300px' ,height:'216px'}}>
           
            </div>

            <h2 className="inner-book__secondary--title">About the author</h2>

            <div className="inner-book__author--description" style={{backgroundColor:'#f4f4f4',width:'600px' ,height:'192px'}}>
          
            </div>
          </div>

          <div className="inner-book--img-wrapper">

            <figure className="book__image--wrapper" style={{ backgroundColor:'#f4f4f4',height: '300px', width: '300px', minWidth: '300px' }}>
             
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SummaryBookSkel;
