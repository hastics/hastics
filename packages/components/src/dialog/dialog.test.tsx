import { render, screen } from "@testing-library/react";

import Dialog from "./dialog";

describe("Dialog", () => {
  it("should render successfully", () => {
    render(
      <Dialog isOpen>
        <header>
          <h3>Important Information</h3>
        </header>
        <div>
          Nihil hic munitissimus habendi senatus locus, nihil horum? At nos hinc posthac, sitientis piros Afros. Magna
          pars studiorum, prodita quaerimus. Integer legentibus erat a ante historiarum dapibus. Praeterea iter est
          quasdam res quas ex communi. Ullamco laboris nisi ut aliquid ex ea commodi consequat. Inmensae subtilitatis,
          obscuris et malesuada fames. Me non paenitet nullum festiviorem excogitasse ad hoc. Cum ceteris in veneratione
          tui montes, nascetur mus. Etiam habebis sem dicantur magna mollis euismod. Quis aute iure reprehenderit in
          voluptate velit esse. Phasellus laoreet lorem vel dolor tempus vehicula. Ambitioni dedisse scripsisse
          iudicaretur. Paullum deliquit, ponderibus modulisque suis ratio utitur. Ab illo tempore, ab est sed
          immemorabili. Nec dubitamus multa iter quae et nos invenerat. Tu quoque, Brute, fili mi, nihil timor populi,
          nihil! Morbi fringilla convallis sapien, id pulvinar odio volutpat. Cras mattis iudicium purus sit amet
          fermentum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Quisque ut dolor gravida, placerat libero
          vel, euismod.
        </div>
        <footer>
          <button>Cancel</button>
          <button>Accept</button>
        </footer>
      </Dialog>,
    );

    expect(screen.getByRole("dialog")).toMatchSnapshot();
    expect(screen.getByTestId("dialog-overlay")).toBeInTheDocument();
  });

  it("should render successfully without the overlay", () => {
    render(
      <Dialog isOpen withoutOverlay>
        <header>
          <h3>Important Information</h3>
        </header>
        <div>
          Nihil hic munitissimus habendi senatus locus, nihil horum? At nos hinc posthac, sitientis piros Afros. Magna
          pars studiorum, prodita quaerimus. Integer legentibus erat a ante historiarum dapibus. Praeterea iter est
          quasdam res quas ex communi. Ullamco laboris nisi ut aliquid ex ea commodi consequat. Inmensae subtilitatis,
          obscuris et malesuada fames. Me non paenitet nullum festiviorem excogitasse ad hoc. Cum ceteris in veneratione
          tui montes, nascetur mus. Etiam habebis sem dicantur magna mollis euismod. Quis aute iure reprehenderit in
          voluptate velit esse. Phasellus laoreet lorem vel dolor tempus vehicula. Ambitioni dedisse scripsisse
          iudicaretur. Paullum deliquit, ponderibus modulisque suis ratio utitur. Ab illo tempore, ab est sed
          immemorabili. Nec dubitamus multa iter quae et nos invenerat. Tu quoque, Brute, fili mi, nihil timor populi,
          nihil! Morbi fringilla convallis sapien, id pulvinar odio volutpat. Cras mattis iudicium purus sit amet
          fermentum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Quisque ut dolor gravida, placerat libero
          vel, euismod.
        </div>
        <footer>
          <button>Cancel</button>
          <button>Accept</button>
        </footer>
      </Dialog>,
    );

    expect(screen.getByRole("dialog")).toMatchSnapshot();
    expect(screen.queryByTestId("dialog-overlay")).not.toBeInTheDocument();
  });
});
