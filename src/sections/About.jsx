export default function About() {
  return (
    <section
      id="apropos"
      className="relative min-h-screen box-border overflow-hidden bg-paper text-ink grid grid-cols-[clamp(220px,30vw,420px)_minmax(0,1fr)] border-t border-rule max-[720px]:grid-cols-1"
    >
      <div className="relative overflow-hidden bg-accent flex items-center justify-center max-[720px]:min-h-[140px]">
        <div className="absolute inset-0 bg-accent animate-[panelIn_1.1s_cubic-bezier(0.2,0.8,0.2,1)_both]" />
        <span
          className="relative z-1 [writing-mode:vertical-rl] text-[clamp(46px,12vw,128px)] leading-[0.92] font-extrabold tracking-[-0.04em] text-white animate-[sideLabelIn_1.2s_0.35s_cubic-bezier(0.2,0.8,0.2,1)_both] max-[720px]:[writing-mode:horizontal-tb] max-[720px]:text-[clamp(32px,12vw,64px)] max-[720px]:animate-[textUp_1.2s_0.35s_cubic-bezier(0.2,0.8,0.2,1)_both]"
        >
          Who I <span className="font-normal italic">am</span>
        </span>
      </div>

      <div className="flex flex-col justify-center gap-[clamp(22px,3.4vh,40px)] px-[clamp(40px,6vw,96px)] py-[clamp(56px,9vh,120px)]">
        <h2
          style={{ animationDelay: '0.08s' }}
          className="m-0 max-w-[22ch] text-[clamp(30px,5.6vh,64px)] leading-[0.98] font-extrabold tracking-[-0.04em] [text-wrap:balance] animate-[textUp_0.95s_cubic-bezier(0.2,0.8,0.2,1)_both]"
        >
          Je code parce que j&apos;ai besoin de comprendre.
        </h2>

        <p
          style={{ animationDelay: '0.2s' }}
          className="m-0 max-w-[56ch] text-[clamp(16px,2.1vh,21px)] leading-[1.5] tracking-[-0.01em] [text-wrap:pretty] animate-[riseIn_0.9s_cubic-bezier(0.2,0.8,0.2,1)_both]"
        >
          Je m&apos;appelle Cédric Guéguénou, ingénieur diplômé de CPE Lyon en
          Conception Logicielle &amp; Big Data. Je construis des applications
          full-stack, du front en <strong>React</strong> au back en{' '}
          <strong>C#/.NET</strong> ou <strong>Python.</strong>
        </p>

        <p
          style={{ animationDelay: '0.28s' }}
          className="m-0 max-w-[56ch] text-[clamp(15px,1.8vh,17px)] leading-[1.65] text-muted [text-wrap:pretty] animate-[riseIn_0.9s_cubic-bezier(0.2,0.8,0.2,1)_both]"
        >
          Je suis curieux de nature, et ça se voit dans ma façon de coder : je vois
          l&apos;IA comme un outil pour apprendre plus vite et explorer plus large,
          pas comme un raccourci pour éviter de comprendre. Elle m&apos;a permis de
          prendre en main de nouveaux langages sur le tas, de creuser des sujets que
          je ne maîtrisais pas encore, et de rester efficace même quand le terrain
          était inconnu.
        </p>

        <p
          style={{ animationDelay: '0.36s' }}
          className="m-0 max-w-[56ch] text-[clamp(15px,1.8vh,17px)] leading-[1.65] text-muted [text-wrap:pretty] animate-[riseIn_0.9s_cubic-bezier(0.2,0.8,0.2,1)_both]"
        >
          Ce qui me fait avancer, au fond, c&apos;est le problème à résoudre plus que
          la technologie elle-même. Peu importe la stack ou le contexte, ce que
          j&apos;aime c&apos;est comprendre ce qui coince et trouver comment le
          réparer proprement, jusqu&apos;au bout.
        </p>
      </div>
    </section>
  );
}
