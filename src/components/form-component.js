ko.components.register("form-component", {
  viewModel: function (params) {
    console.log("hello, im form");
    var accordion1Options = [
      { label: "Option 1.1", value: "value1.1" },
      { label: "Option 1.2", value: "value1.2" },
      // Add more options as needed
    ];
    var accordion2Options = [
      { label: "Option 2.1", value: "value2.1" },
      { label: "Option 2.2", value: "value2.2" },
      // Add more options as needed
    ];
    var accordion3Options = [
      { label: "Option 2.1", value: "value2.1" },
      { label: "Option 2.2", value: "value2.2" },
      // Add more options as needed
    ];
    return {
      accordion1Options: accordion1Options,
      accordion2Options: accordion2Options,
      accordion3Options: accordion3Options,
    };
  },
  template: `
 <form>
      <h2>hello, i'm form</h2>
      <accordion params="title: 'Accordion 1', options: accordion1Options"></accordion>
      <accordion params="title: 'Accordion 2', options: accordion2Options"></accordion>
      <accordion params="title: 'Accordion 3', options: accordion3Options"></accordion>
    </form>
  `,
});
