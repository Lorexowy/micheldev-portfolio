export default function Uslugi() {
  return (
    <section id="uslugi" className="py-20 px-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center">Moje Usługi</h2>
      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        <div className="p-6 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Projektowanie graficzne</h3>
          <p>Logo, identyfikacja wizualna, materiały marketingowe</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded shadow">
          <h3 className="text-xl font-semibold mb-2">Tworzenie stron</h3>
          <p>Nowoczesne, responsywne strony internetowe z dobrą optymalizacją</p>
        </div>
      </div>
    </section>
  );
}