export const nodeConfig = {
  parent: {
    id: true,
    position: true,
  },
  item: {
    id: true,
    label: {
      es: true,
      en: true,
    },
    action: true,
    details: true,
    exp: true,
    mode: true,
    style: true,
    type: true,
    icon: {
      key: true,
      size: true,
      top: true,
    },
    background: {
      full: true,
      height: true,
      src: true,
      x: true,
      y: true,
    },
    colors: {
      primary: true,
      secondary: true,
    },
    sublabels: {
      es: true,
      en: true,
    },
    description: {
      en: true,
      es: true,
    },
  },
  children: {
    id: true,
    item: {
      label: {
        es: true,
        en: true,
      },
      icon: {
        key: true,
      },
      colors: {
        primary: true,
        secondary: true,
      },
      sublabels: {
        es: true,
        en: true,
      },
      action: true,
      mode: true,
      background: {
        full: true,
        height: true,
        src: true,
        x: true,
        y: true,
      },
    },
    position: true,
  },
  position: true,
};
