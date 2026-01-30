"use client";

export function TestSection() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        zIndex: 100,
        position: "relative",
        backgroundColor: "hsl(var(--background))",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <div className="text-center space-y-4 p-8">
        <h2 className="text-4xl md:text-6xl font-bold text-foreground">
          Sección de Prueba
        </h2>
        <p className="text-lg md:text-xl opacity-70 text-foreground">
          Esta sección debería deslizarse sobre el marquee cuando haces scroll
        </p>
        <div className="mt-8 p-4 bg-primary/10 rounded-lg">
          <p className="text-sm opacity-60">
            Si ves este texto, la sección se está mostrando correctamente
          </p>
        </div>
      </div>
    </div>
  );
}
