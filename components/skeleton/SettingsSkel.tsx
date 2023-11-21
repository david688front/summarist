
function SettingsSkel()
{

    return (
        <div className="container">
          <div className="row">
            <div className="section__title page__title">Settings</div>
              <>
                <div className="setting__content">
                  <div className="settings__sub--title" >Your Subscription Plan</div>
                  <div className="settings__text" style={{backgroundColor: "#f4f4f4", width: "98px", height: "19px"}}>
                  </div>

                  <div className="settings__text" style={{backgroundColor: "#f4f4f4", width: "180px", height: "40px"}}>
                  </div>
                </div>
                <div className="setting__content">
                  <div className="settings__sub--title">Email</div>
                  <div className="settings__text" style={{backgroundColor: "#f4f4f4", width: "127px", height: "19px"}} > </div>
                </div>
              </>

          </div>
        </div>
      );
}

export default SettingsSkel;