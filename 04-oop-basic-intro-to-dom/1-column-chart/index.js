export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor(props = {}) {
    const {data = [], label = 0, value = '', link = '', formatHeading = value => value} = props;
    this.label = label;
    this.link = link;
    this.value = value;
    this.data = data;
    this.formatHeading = formatHeading;
    // this.getColumnProps = getColumnProps;
    this.element = this.createElement(this.createTemplate());
  }

  destroy() {
    this.remove();
  }

  remove() {
    this.element.remove();
  }

  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }


  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  createChartBodyTemplate(data) {
    return this.getColumnProps(this.data).map((elem) => {
      return `<div style="--value: ${elem.value}" data-tooltip=${String(elem.percent)}></div>`;
    }).join('');
  }

  createChartClasse() {
    return this.data.length ? 'column-chart' : `column-chart_loading`;
  }


  createLinkTemplate() {
    if (!this.link) {
      return '';
    }
    return `<a href="${this.link}" class="column-chart__link">View all</a>`;
  }

  createTemplate() {
    return (`
    <div class="${this.createChartClasse()}" style="--chart-height: 50">
      <div class="column-chart__title">
        ${this.label}
        ${this.createLinkTemplate()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading(this.value)}</div>
        <div data-element="body" class="column-chart__chart">
            ${this.createChartBodyTemplate()}
        </div>
      </div>
    </div>
  </div>
    `);
  }


  update(newData) {
    this.data = newData;
    this.element.querySelector('[data-element="body"]').innerHTML = this.createChartBodyTemplate();
  }

  get chartTitle() {
    return `Total ${this.label}`;
  }

}
