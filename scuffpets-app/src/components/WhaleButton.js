const SidebarButton: React.FC<SidebarButtonProps> = ({
	icon,
	label,
	...props
}) => {
	return (
		<Box
            as='button'
            onClick={handleRoll}
        >
	        <Image 
	            boxSize='200px'
	            src='/imgs/wastemoney.png' 
	        />
        </Box>
};

export default SidebarButton;