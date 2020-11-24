import { createTest, createVue, destroyVM, wait } from '../util';
import Avatar from 'packages/avatar';
import { IMAGE_SUCCESS, IMAGE_FAIL } from '../mocks/uri';

describe('Avatar', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Avatar);
    expect(vm.$el).to.exist;
  });

  it('size is number', () => {
    vm = createVue({
      template: `
        <el-avatar :size="50">
        </el-avatar>
      `
    }, true);
    const avatarElm = vm.$el;
    expect(avatarElm.style.height).to.equal('50px');
  });

  it('size is string', () => {
    vm = createVue({
      template: `
        <el-avatar size="small">
          user
        </el-avatar>
      `
    }, true);
    const avatarElm = vm.$el;
    expect(avatarElm.classList.contains('el-avatar--small')).to.be.true;
  });

  it('shape', () => {
    vm = createVue({
      template: `
        <el-avatar size="small" shape="square">
          user
        </el-avatar>
      `
    }, true);
    const avatarElm = vm.$el;
    expect(avatarElm.classList.contains('el-avatar--square')).to.be.true;
  });

  it('icon avatar', () => {
    vm = createVue({
      template: `
        <el-avatar icon="el-icon-user-solid">
        </el-avatar>
      `
    }, true);
    const avatarElm = vm.$el;
    const iconELm = avatarElm.children[0];
    expect(avatarElm.classList.contains('el-avatar--icon')).to.be.true;
    expect(iconELm.classList.contains('el-icon-user-solid')).to.be.true;
  });

  it('no avatar tooltip', (done) => {
    vm = createVue({
      template: `
          <el-avatar 
            ref="avatarTooltip" 
            src="${IMAGE_SUCCESS}">
          </el-avatar>
        `
    }, true);
    vm.$nextTick(_ => {
      expect(vm.$refs.avatarTooltip.$children[0].popperVM.$el).to.have.property('textContent', '');
      done();
    });
  });

  it('avatar tooltip - display text value', (done) => {
    vm = createVue({
      template: `
          <el-avatar 
            ref="avatarTooltip" 
            src="${IMAGE_SUCCESS}" 
            text="display 'text' by tooltip">
          </el-avatar>
        `
    }, true);
    vm.$nextTick(_ => {
      expect(vm.$refs.avatarTooltip.$children[0].popperVM.$el).to.have.property('textContent', "display 'text' by tooltip");
      done();
    });
  });

  it('avatar tooltip - display tooltip value', (done) => {
    vm = createVue({
      template: `
          <el-avatar 
            ref="avatarTooltip" 
            src="${IMAGE_SUCCESS}" 
            tooltip="display 'tooltip' by tooltip">
          </el-avatar>
        `
    }, true);
    vm.$nextTick(_ => {
      expect(vm.$refs.avatarTooltip.$children[0].popperVM.$el).to.have.property('textContent', "display 'tooltip' by tooltip");
      done();
    });
  });

  it('avatar tooltip - priority display tooltip value', (done) => {
    vm = createVue({
      template: `
          <el-avatar 
            ref="avatarTooltip" 
            src="${IMAGE_SUCCESS}" 
            text="text"  
            tooltip="tooltip">
          </el-avatar>
        `
    }, true);
    vm.$nextTick(_ => {
      expect(vm.$refs.avatarTooltip.$children[0].popperVM.$el).to.have.property('textContent', 'tooltip');
      done();
    });
  });

  it('image avatar', () => {
    vm = createVue({
      template: `
        <el-avatar src="${IMAGE_SUCCESS}"></el-avatar>
      `
    }, true);
    const imgElm = vm.$el.children[0];
    expect(imgElm.tagName.toUpperCase()).to.equal('IMG');
    expect(imgElm.src).to.equal(IMAGE_SUCCESS);
  });

  it('image fallback text', async() => {
    vm = createVue({
      template: `
        <el-avatar 
            src="${IMAGE_FAIL}" 
            @error="errorHandler" 
            text="fallback text" 
            bgColor="#409eff">
        </el-avatar>
      `,
      methods: {
        errorHandler() {
          return true;
        }
      }
    }, true);
    await wait();
    const avatarElm = vm.$el;
    expect(avatarElm.textContent.trim()).to.equal('fallback text'.slice(-2));
    expect(avatarElm.style.backgroundColor).to.equal('rgb(64, 158, 255)');
  });

  it('image fallback slot', async() => {
    vm = createVue({
      template: `
        <el-avatar src="${IMAGE_FAIL}" @error="errorHandler" text="fallback text">
          fallback slot
        </el-avatar>
      `,
      methods: {
        errorHandler() {
          return true;
        }
      }
    }, true);
    await wait();
    const avatarElm = vm.$el;
    expect(avatarElm.textContent.trim()).to.equal('fallback slot');
  });

  it('custom textFormatter', async() => {
    vm = createVue({
      template: `
        <el-avatar
            ref="avatarTooltip"
            src="${IMAGE_FAIL}" 
            @error="errorHandler" 
            text="Linus Torvalds"
            :text-formatter="(s) => s.split(' ').map(s=>s[0]).join('')"
        >
        </el-avatar>
      `,
      methods: {
        errorHandler() {
          return true;
        }
      }
    }, true);
    await wait();
    const avatarElm = vm.$el;
    expect(avatarElm.textContent.trim()).to.equal('LT');

    return await new Promise(resolve=>{
      vm.$nextTick(_ => {
        expect(vm.$refs.avatarTooltip.$children[0].popperVM.$el).to.have.property('textContent', 'Linus Torvalds');
        resolve();
      });
    });
  });

  it('image fit', async() => {
    vm = createVue({
      template: `
        <div>
          <el-avatar :src="url"></el-avatar>
          <el-avatar :src="url" v-for="fit in fits" :fit="fit" :key="fit"></el-avatar>
        </div>
        
      `,
      data() {
        return {
          fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
          url: IMAGE_SUCCESS
        };
      }
    }, true);
    await wait();
    const containerElm = vm.$el;
    expect(containerElm.children[0].children[0].style.objectFit).to.equal('cover');
    expect(containerElm.children[1].children[0].style.objectFit).to.equal('fill');
    expect(containerElm.children[2].children[0].style.objectFit).to.equal('contain');
    expect(containerElm.children[3].children[0].style.objectFit).to.equal('cover');
    expect(containerElm.children[4].children[0].style.objectFit).to.equal('none');
    expect(containerElm.children[5].children[0].style.objectFit).to.equal('scale-down');
  });
});

