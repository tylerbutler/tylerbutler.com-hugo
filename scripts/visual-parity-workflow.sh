#!/bin/bash
# Visual Parity Workflow Automation
# Streamlines the measurement → adjustment → test cycle

set -e

echo "🎯 Visual Parity Workflow Starting..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
HUGO_PORT_REFERENCE=1313
HUGO_PORT_MODERN=1314
SASS_FILE="themes/dark_rainbow/assets/sass/visual-match-foundation.scss"
MEASUREMENT_SCRIPT="scripts/quick-measure.js"

echo -e "${BLUE}📋 VISUAL PARITY WORKFLOW${NC}"
echo "Reference port: $HUGO_PORT_REFERENCE"
echo "Modern port: $HUGO_PORT_MODERN"
echo "Sass file: $SASS_FILE"
echo ""

# Function to check if Hugo server is running on a port
check_hugo_server() {
    local port=$1
    if lsof -ti:$port > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Hugo server running on port $port${NC}"
        return 0
    else
        echo -e "${RED}❌ No Hugo server on port $port${NC}"
        return 1
    fi
}

# Function to start Hugo servers if needed
start_servers() {
    echo -e "${YELLOW}🚀 Checking Hugo servers...${NC}"
    
    # Check reference server
    if ! check_hugo_server $HUGO_PORT_REFERENCE; then
        echo -e "${BLUE}Starting reference Hugo server on port $HUGO_PORT_REFERENCE...${NC}"
        hugo server --port $HUGO_PORT_REFERENCE --bind 127.0.0.1 --environment test > /dev/null 2>&1 &
        sleep 3
        check_hugo_server $HUGO_PORT_REFERENCE
    fi
    
    # Check modern server  
    if ! check_hugo_server $HUGO_PORT_MODERN; then
        echo -e "${BLUE}Starting modern Hugo server on port $HUGO_PORT_MODERN...${NC}"
        hugo server --port $HUGO_PORT_MODERN --bind 127.0.0.1 --environment test > /dev/null 2>&1 &
        sleep 3
        check_hugo_server $HUGO_PORT_MODERN
    fi
}

# Function to run visual regression test
run_test() {
    echo -e "${YELLOW}🧪 Running visual regression test...${NC}"
    if npm run test:visual 2>/dev/null; then
        echo -e "${GREEN}✅ Visual tests PASSED!${NC}"
        return 0
    else
        echo -e "${RED}❌ Visual tests FAILED - continue with measurements${NC}"
        return 1
    fi
}

# Function to display measurement instructions
show_measurement_instructions() {
    echo -e "${BLUE}📏 MEASUREMENT INSTRUCTIONS:${NC}"
    echo ""
    echo "1. Open browser tabs:"
    echo "   - Foundation: http://127.0.0.1:$HUGO_PORT_REFERENCE"
    echo "   - Modern:     http://127.0.0.1:$HUGO_PORT_MODERN?layout=modern"
    echo ""
    echo "2. Copy this into browser console on BOTH tabs:"
    echo "   Copy contents of: $MEASUREMENT_SCRIPT"
    echo ""
    echo "3. Run measurements:"
    echo "   Foundation tab: foundation = quickHeight()"
    echo "   Modern tab:     modern = quickHeight()"
    echo ""
    echo "4. Compare results:"
    echo "   Either tab:     compare(foundation, modern)"
    echo ""
    echo "5. Generate CSS fixes:"
    echo "   Either tab:     generateCSS(foundation.mainHeight, modern.mainHeight)"
    echo ""
    echo -e "${YELLOW}📝 Apply CSS fixes to: $SASS_FILE${NC}"
    echo -e "${YELLOW}📝 Then run: ./scripts/visual-parity-workflow.sh test${NC}"
}

# Function to show CSS adjustment template
show_css_template() {
    echo -e "${BLUE}🎨 CSS ADJUSTMENT TEMPLATE:${NC}"
    echo ""
    echo "Add to $SASS_FILE in the 'SYSTEMATIC SPACING ADJUSTMENTS' section:"
    echo ""
    echo "/* Based on measurements: [FOUNDATION_HEIGHT]px → [MODERN_HEIGHT]px (diff: [DIFFERENCE]px) */"
    echo "body.modern-layout p {"
    echo "  margin-bottom: [CALCULATED_VALUE]rem !important;"
    echo "  line-height: [CALCULATED_VALUE] !important;"
    echo "}"
    echo ""
    echo "body.modern-layout article {"
    echo "  margin-bottom: [CALCULATED_VALUE]rem !important;"
    echo "}"
    echo ""
}

# Main workflow
case "${1:-help}" in
    "start")
        start_servers
        show_measurement_instructions
        ;;
    "test")
        echo -e "${YELLOW}⚡ Testing current state...${NC}"
        run_test
        ;;
    "measure")
        start_servers
        show_measurement_instructions
        ;;
    "css")
        show_css_template
        ;;
    "full")
        echo -e "${BLUE}🔄 Running full workflow cycle...${NC}"
        start_servers
        run_test
        show_measurement_instructions
        ;;
    "help"|*)
        echo -e "${BLUE}🎯 Visual Parity Workflow${NC}"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  start   - Start Hugo servers and show measurement instructions"
        echo "  test    - Run visual regression tests"
        echo "  measure - Start servers and show measurement guide"
        echo "  css     - Show CSS adjustment template"
        echo "  full    - Complete workflow (start → test → measure)"
        echo "  help    - Show this help"
        echo ""
        echo "Typical workflow:"
        echo "  1. $0 start"
        echo "  2. Follow measurement instructions in browser"
        echo "  3. Apply CSS fixes to $SASS_FILE"
        echo "  4. $0 test"
        echo "  5. Repeat until tests pass"
        ;;
esac

echo ""
echo -e "${GREEN}🎯 Workflow complete. Next: Apply measurements and run '$0 test'${NC}"