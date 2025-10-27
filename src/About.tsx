const { BASE_URL } = process.env;

export default () => {
  return <div>
    This page is blah blah.

    DEMO: {(() => {
      const button = <button>Click here</button>
      const session_id = 'session0817h7dh';
      const redirect_url = 'https://www.google.com';
      const dialogParams = { session_id, redirect_url };
      // make url with params, escaping:
      const params = new URLSearchParams(dialogParams);
      const url = `${BASE_URL}/google_dialog?${params}`;
      console.log(url)
      button.onclick = () => { window.location.href = url; }
      return button;
    })()}
  </div>
};
