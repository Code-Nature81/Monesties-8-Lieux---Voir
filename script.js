class CitiesSlider extends React.Component {
  constructor(props) {
    super(props);

    this.IMAGE_PARTS = 4;

    this.changeTO = null;
    this.AUTOCHANGE_TIME = 2400;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = this.props.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    return (
      React.createElement("div", { className: classNames('slider', { 's--ready': sliderReady }) },
      React.createElement("p", { className: "slider__top-heading" }, "Monestés 8 lieux à voir"),
      
      React.createElement("div", { className: "slider__slides" },
      this.props.slides.map((slide, index) =>
      React.createElement("div", {
        className: classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index }),
        key: slide.city },

      React.createElement("div", { className: "slider__slide-content" },
      React.createElement("h3", { className: "slider__slide-subheading" }, slide.country || slide.city),
      React.createElement("h2", { className: "slider__slide-heading" },
      slide.city.split('').map(l => React.createElement("span", null, l))),

      React.createElement("p", { className: "slider__slide-readmore" }, "")),

      React.createElement("div", { className: "slider__slide-parts" },
      [...Array(this.IMAGE_PARTS).fill()].map((x, i) =>
      React.createElement("div", { className: "slider__slide-part", key: i },
      React.createElement("div", { className: "slider__slide-part-inner", style: { backgroundImage: `url(${slide.img})` } }))))))),






      React.createElement("div", { className: "slider__control", onClick: () => this.changeSlides(-1) }),
      React.createElement("div", { className: "slider__control slider__control--right", onClick: () => this.changeSlides(1) }),
      React.createElement("div", { className: "slider__table" })));


}}


const slides = [
{
  
  city: 'Du-Griffoul',
  country: 'Fontaine',
  img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1920x400:format=png/path/sb96c01c741db7101/image/ibf8808d0db9db3f0/version/1652700046/image.png' },
{
  city: 'Au-Tombeau',
  country: 'Mise',
  img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1920x400:format=png/path/sb96c01c741db7101/image/i8979cbc58904b75c/version/1652700762/image.png' },

{
  city: 'Médiévale',
  country: 'Porte',
  img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1920x400:format=png/path/sb96c01c741db7101/image/ic00da4a74fba4e72/version/1652700046/image.png' },

{
  city: 'Saint-Pierre',
  country: 'Eglise',
  img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1920x400:format=png/path/sb96c01c741db7101/image/i6e1adfa55c40e63e/version/1652700046/image.png' },

{
  city: 'De-Candèze',
  country: 'Pont',
  img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=600x2000:format=png/path/sb96c01c741db7101/image/i35ef595e4ce79b9a/version/1652700046/image.png' },

  {
      city: 'Bajén-Vega',
      country: 'Musée',
      img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1920x400:format=png/path/sb96c01c741db7101/image/iab91893e1b3f475d/version/1652700046/image.png' },

  {
    city: 'Du-Groc',
    country: 'Pont',
    img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=800x300:format=png/path/sb96c01c741db7101/image/i6785cb558bbbae5a/version/1652700046/image.png' },
  
    {
      city: 'Botanique',
      country: 'Sentier',
      img: 'https://image.jimcdn.com/app/cms/image/transf/dimension=1000x400:format=png/path/sb96c01c741db7101/image/if4423445a53b15b2/version/1652700046/image.png' }];



ReactDOM.render(React.createElement(CitiesSlider, { slides: slides }), document.querySelector('#app'));

