/**
 * 弹出层高阶组件，对外提供show和hide方法
 * @author VenDream
 * @since 2019-5-17
 */

import classnames from 'classnames';
import React, { Component, Children, cloneElement, CSSProperties } from 'react';
import ReactDOM, { createPortal, unmountComponentAtNode } from 'react-dom';

import { getUniqueId } from 'utils/common';
import './popup.less';

export interface PopUpProps {
  /**
   * 容器元素
   */
  container?: Element;
  /**
   * 过渡效果类
   */
  transitionClass?: string;
  /**
   * 弹出层显示回调
   */
  onShow?: () => void;
  /**
   * 弹出层销毁回调
   */
  onClose?: () => void;
}

export interface PopUpState {
  style: CSSProperties;
}

/**
 * 返回绑定PopUp能力的组件
 *
 * @export
 * @template WrappedComponentProps 被包裹组件的props
 * @param {React.ComponentType<WrappedComponentProps>} WrappedComponent 被包裹的组件
 * @param {boolean} [singleton=true] 是否单例渲染
 */
export default function popUpFactory<WrappedComponentProps>(
  WrappedComponent: React.ComponentType<WrappedComponentProps>,
  singleton: boolean = true
) {
  return class ComponentWithPopUp extends Component<PopUpProps, PopUpState> {
    static defaultProps: PopUpProps = {
      container: document.body,
      transitionClass: 'zoom-in',
    };

    // 实例映射表
    static instances: Record<string, ComponentWithPopUp> = {};

    /**
     * 显示弹出层，使用React.Portal接口实现
     *
     * @static
     * @param {(WrappedComponentProps & PopUpProps)} [props] 被包裹组件和PopUp容器的联合props
     */
    static show(props?: WrappedComponentProps & PopUpProps) {
      const {
        container,
        transitionClass,
        onShow,
        onClose,
        ...wrappedProps
      } = (props || {}) as Record<string, any>;

      // 单例模式先销毁所有旧实例
      singleton && ComponentWithPopUp.hide();

      // 生成新的实例
      const instanceId = getUniqueId(8);
      const overlay = document.createElement('div');
      const instanceRef: React.RefObject<
        ComponentWithPopUp
      > = React.createRef();

      // 执行渲染操作
      ReactDOM.render(
        <ComponentWithPopUp
          container={container}
          transitionClass={transitionClass}
          onShow={onShow}
          onClose={onClose}
          ref={instanceRef}
        >
          <WrappedComponent
            popupInstanceId={instanceId}
            {...(wrappedProps as WrappedComponentProps)}
          />
        </ComponentWithPopUp>,
        overlay
      );

      // 加入实例映射表
      setTimeout(() => {
        const instance = instanceRef.current;
        if (instance) {
          instance.overlay = overlay;
          instance.instanceId = instanceId;
          ComponentWithPopUp.instances[instanceId] = instance;
        }
      }, 0);

      return instanceId;
    }

    /**
     * 关闭弹出层，默认关闭所有实例
     *
     * @static
     * @param {string} [instanceId] 实例ID(可选)
     */
    static hide(instanceId?: string) {
      // 指定关闭一个特定实例
      if (instanceId) {
        const instance = ComponentWithPopUp.instances[instanceId];
        instance && instance.close();
      } else {
        // 关闭所有实例
        for (const instance of Object.values(ComponentWithPopUp.instances)) {
          instance.close();
        }
      }
    }

    // 初始state
    state: PopUpState = { style: {} };
    // 容器节点
    private overlay: Element | null = null;
    // 实例ID
    private instanceId: string | null = null;
    // 页面根元素
    private pageRootEl: HTMLElement = document.documentElement;

    close() {
      this.overlay && unmountComponentAtNode(this.overlay);
    }

    componentDidMount() {
      this.autofit();
      this.props.onShow && this.props.onShow();
      window.addEventListener('resize', this.autofit);
    }

    componentWillUnmount() {
      // 卸载时，清除引用
      if (this.instanceId) {
        delete ComponentWithPopUp.instances[this.instanceId];
      }
      window.removeEventListener('resize', this.autofit);
      this.props.onClose && this.props.onClose();
    }

    // 从html根节点继承宽度
    autofit = () => {
      const pageMaxWidth = parseFloat(this.pageRootEl.style.maxWidth);
      if (isNaN(pageMaxWidth)) return;
      this.setState({ style: { maxWidth: pageMaxWidth } });
    };

    render() {
      const {
        container = document.body,
        children,
        transitionClass,
      } = this.props;
      const childElement = Children.only(children) as React.ReactElement<any>;

      // 拷贝children
      const clonedElement = cloneElement(childElement, {
        // 注入样式
        style: this.state.style,
        // 注入过渡效果类
        className: classnames(
          'g-popup',
          childElement.props.className,
          transitionClass
        ),
        // 注入onClose方法
        onClose: () => {
          this.close();
          childElement.props.onClose && childElement.props.onClose();
        },
      });

      // 通过createPortal挂载到container下
      return createPortal(clonedElement, container);
    }
  };
}
