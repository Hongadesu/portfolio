export default function ErrorPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-(--background) text-(--on-background)'>
      <h1 className='text-4xl font-bold'>Oops!</h1>
      <p className='mt-4 text-lg'>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
