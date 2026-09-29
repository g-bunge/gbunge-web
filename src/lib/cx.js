/** Joins class names, skipping falsy ones: cx('a', isOpen && 'b') → 'a b'. */
export default function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
