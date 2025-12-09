export default function AgentsPage() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BlackRoad Agents - Live Agent Management</title>
      </head>
      <body>
        <iframe 
          src="/agents.html" 
          style={{
            width: '100%',
            height: '100vh',
            border: 'none',
            margin: 0,
            padding: 0,
            display: 'block'
          }}
          title="BlackRoad Agent Dashboard"
        />
      </body>
    </html>
  );
}
