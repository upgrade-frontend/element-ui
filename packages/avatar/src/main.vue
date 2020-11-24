<script>
export default {
  name: 'ElAvatar',

  props: {
    size: {
      type: [Number, String],
      validator(val) {
        if (typeof val === 'string') {
          return ['large', 'medium', 'small'].includes(val);
        }
        return typeof val === 'number';
      },
      default: 'large'
    },
    shape: {
      type: String,
      default: 'circle',
      validator(val) {
        return ['circle', 'square'].includes(val);
      }
    },
    icon: String,
    src: String,
    alt: String,
    srcSet: String,
    error: Function,
    fit: {
      type: String,
      default: 'cover'
    },
    text: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 12
    },
    bgColor: {
      type: String,
      default: '#C0C4CC'
    },
    textFormatter: {
      type: Function,
      default: (str) => str.slice(-2)
    },
    tooltip: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isImageExist: true
    };
  },

  computed: {
    avatarClass() {
      const { size, icon, shape } = this;
      const classList = ['el-avatar'];

      if (size && typeof size === 'string') {
        classList.push(`el-avatar--${size}`);
      }

      if (icon) {
        classList.push('el-avatar--icon');
      }

      if (shape) {
        classList.push(`el-avatar--${shape}`);
      }

      return classList.join(' ');
    }
  },

  methods: {
    handleError() {
      const { error } = this;
      const errorFlag = error ? error() : undefined;
      if (errorFlag !== false) {
        this.isImageExist = false;
      }
    },
    renderAvatar() {
      const {
        icon,
        src,
        text,
        alt,
        isImageExist,
        srcSet,
        fit,
        fontSize,
        textFormatter
      } = this;

      if (isImageExist && src) {
        return (
          <img
            src={src}
            onError={this.handleError}
            alt={alt}
            srcSet={srcSet}
            style={{ 'object-fit': fit }}
          />
        );
      }

      if (icon) {
        return <i class={icon} />;
      }

      if (this.$slots.default) {
        return this.$slots.default;
      }

      const textStyle = {
        transform: `translate(-50%, -50%) scale(${fontSize / 12})`
      };

      return (
        <span class="avatar-text" style={textStyle}>
          {textFormatter(text)}
        </span>
      );
    }
  },

  render() {
    const { avatarClass, size, bgColor, text, tooltip } = this;

    const sizeStyle =
      typeof size === 'number'
        ? {
          height: `${size}px`,
          width: `${size}px`,
          lineHeight: `${size}px`
        }
        : {};

    const bgStyle = {
      backgroundColor: bgColor
    };

    const style = { ...sizeStyle, ...bgStyle };

    return (
      <el-tooltip
        disabled={!(tooltip || text)}
        content={tooltip || text}
        placement="top"
        popper-class="el-avatar-popper"
      >
        <span class={avatarClass} style={style}>
          {this.renderAvatar()}
        </span>
      </el-tooltip>
    );
  }
};
</script>
